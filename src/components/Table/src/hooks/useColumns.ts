import type { BasicColumn, BasicTableProps, CellFormat, GetColumnsParams } from '../types/table';
import type { PaginationProps } from '../types/pagination';
import type { ComputedRef, Slots } from 'vue';
import { computed, Ref, ref, toRaw, unref, watch } from 'vue';
import { renderEditCell } from '../components/editable';
import { usePermission } from '/@/hooks/web/usePermission';
// import { useI18n } from '/@/hooks/web/useI18n';
import { isArray, isBoolean, isFunction, isMap, isString } from '/@/utils/is';
import { cloneDeep, isEqual } from 'lodash-es';
import { formatToDate } from '/@/utils/dateUtil';
import { ACTION_COLUMN_FLAG, DEFAULT_ALIGN, INDEX_COLUMN_FLAG, PAGE_SIZE } from '../const';
import dayjs from 'dayjs';

function handleItem(item: BasicColumn, ellipsis: boolean) {
  const { columnKey, index, children } = item;
  item.align = item.align || DEFAULT_ALIGN;
  if (ellipsis) {
    if (!columnKey) {
      item.columnKey = `${index}`;
    }
    // if (!isBoolean(item.ellipsis)) {
    //   Object.assign(item, {
    //     ellipsis,
    //   });
    // }
  }
  if (children && children.length) {
    handleChildren(children, !!ellipsis);
  }
}

function handleChildren(children: BasicColumn[] | undefined, ellipsis: boolean) {
  if (!children) return;
  children.forEach((item) => {
    const { children } = item;
    handleItem(item, ellipsis);
    handleChildren(children, ellipsis);
  });
}

function handleIndexColumn(
  propsRef: ComputedRef<BasicTableProps>,
  getPaginationRef: ComputedRef<boolean | PaginationProps>,
  columns: BasicColumn[]
) {
  // const { t } = useI18n();

  const { showIndexColumn, indexColumnProps, isTreeTable } = unref(propsRef);

  let pushIndexColumns = false;
  if (unref(isTreeTable)) {
    return;
  }
  columns.forEach(() => {
    const indIndex = columns.findIndex((column) => column.flag === INDEX_COLUMN_FLAG);
    if (showIndexColumn) {
      pushIndexColumns = indIndex === -1;
    } else if (!showIndexColumn && indIndex !== -1) {
      columns.splice(indIndex, 1);
    }
  });

  if (!pushIndexColumns) return;

  const isFixedLeft = columns.some((item) => item.fixed === 'left');

  columns.unshift({
    flag: INDEX_COLUMN_FLAG,
    width: 50,
    label: 'index',
    align: 'center',
    formatter: ({ index }) => {
      const getPagination = unref(getPaginationRef);
      if (isBoolean(getPagination)) {
        return `${index + 1}`;
      }
      const { current = 1, pageSize = PAGE_SIZE } = getPagination;
      return ((current < 1 ? 1 : current) - 1) * pageSize + index + 1;
    },
    ...(isFixedLeft
      ? {
          fixed: 'left'
        }
      : {}),
    ...indexColumnProps
  });
}

function handleActionColumn(propsRef: ComputedRef<BasicTableProps>, columns: BasicColumn[]) {
  const { actionColumn } = unref(propsRef);
  if (!actionColumn) return;

  const hasIndex = columns.findIndex((column) => column.flag === ACTION_COLUMN_FLAG);
  if (hasIndex === -1) {
    columns.push({
      ...columns[hasIndex],
      fixed: 'right',
      ...actionColumn,
      flag: ACTION_COLUMN_FLAG
    });
  }
}

export function useColumns(
  propsRef: ComputedRef<BasicTableProps>,
  getPaginationRef: ComputedRef<boolean | PaginationProps>,
  slots: Slots
) {
  const columnsRef = ref(unref(propsRef).columns) as unknown as Ref<BasicColumn[]>;
  let cacheColumns = unref(propsRef).columns;

  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef));

    handleIndexColumn(propsRef, getPaginationRef, columns);
    handleActionColumn(propsRef, columns);
    if (!columns) {
      return [];
    }
    const { ellipsis } = unref(propsRef);

    columns.forEach((item) => {
      const { formatter, slots } = item;

      handleItem(item, Reflect.has(item, 'ellipsis') ? true : !!ellipsis && !formatter && !slots);
    });
    return columns;
  });

  function isIfShow(column: BasicColumn): boolean {
    const ifShow = column.ifShow;

    let isIfShow = true;

    if (isBoolean(ifShow)) {
      isIfShow = ifShow;
    }
    if (isFunction(ifShow)) {
      isIfShow = ifShow(column);
    }
    return isIfShow;
  }
  const { hasPermission } = usePermission();

  const getViewColumns = computed(() => {
    const viewColumns = sortFixedColumn(unref(getColumnsRef));

    const columns = cloneDeep(viewColumns);
    return columns
      .filter((column) => {
        return hasPermission(column.auth) && isIfShow(column);
      })
      .map((column) => {
        const { slots, index, formatter, format, edit, editRow, flag } = column;

        if (!slots || !slots?.title) {
          // column.slots = { title: `header-${index}`, ...(slots || {}) };
          column.customTitle = column.label;
          Reflect.deleteProperty(column, 'label');
        }
        const isDefaultAction = [INDEX_COLUMN_FLAG, ACTION_COLUMN_FLAG].includes(flag!);
        // 时间类型格式化 format = trure
        if (!formatter && format && !edit && !isDefaultAction) {
          column.formatter = (row, column, cellValue, index) => {
            return formatCell(cellValue, format, column, index);
          };
        }

        // edit table
        if ((edit || editRow) && !isDefaultAction) {
          column.formatter = renderEditCell(column);
        }
        return column;
      });
  });

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      columnsRef.value = columns;
      cacheColumns = columns?.filter((item) => !item.flag) ?? [];
    }
  );

  function setCacheColumnsByField(index: string | undefined, value: Partial<BasicColumn>) {
    if (!index || !value) {
      return;
    }
    cacheColumns.forEach((item) => {
      if (item.columnKey === index) {
        Object.assign(item, value);
        return;
      }
    });
  }
  /**
   * set columns
   * @param columnList key｜column
   */
  function setColumns(columnList: Partial<BasicColumn>[] | string[]) {
    const columns = cloneDeep(columnList);
    if (!isArray(columns)) return;

    if (columns.length <= 0) {
      columnsRef.value = [];
      return;
    }

    const firstColumn = columns[0];

    const cacheKeys = cacheColumns.map((item) => item.index);

    if (!isString(firstColumn)) {
      columnsRef.value = columns as BasicColumn[];
    } else {
      const columnKeys = columns as string[];
      const newColumns: BasicColumn[] = [];
      cacheColumns.forEach((item) => {
        newColumns.push({
          ...item,
          defaultHidden: !columnKeys.includes(`${item.index!}` || (item.columnKey as string))
        });
      });
      // Sort according to another array
      if (!isEqual(cacheKeys, columns)) {
        newColumns.sort((prev, next) => {
          return (
            columnKeys.indexOf(`${prev.index}` as string) -
            columnKeys.indexOf(`${next.index}` as string)
          );
        });
      }
      columnsRef.value = newColumns;
    }
  }

  function getColumns(opt?: GetColumnsParams) {
    const { ignoreIndex, ignoreAction, sort } = opt || {};
    let columns = toRaw(unref(getColumnsRef));
    if (ignoreIndex) {
      columns = columns.filter((item) => item.flag !== INDEX_COLUMN_FLAG);
    }
    if (ignoreAction) {
      columns = columns.filter((item) => item.flag !== ACTION_COLUMN_FLAG);
    }

    if (sort) {
      columns = sortFixedColumn(columns);
    }

    return columns;
  }
  function getCacheColumns() {
    return cacheColumns;
  }
  const getColumnsSlots: ComputedRef<string[]> = computed(() => {
    const keys = Object.keys(slots);

    return keys
      .map((item) => (item.startsWith('col-') ? item : null))
      .filter((item) => !!item) as string[];
  });

  function replaceColSlotKey(key: string) {
    if (!key) return '';
    return key?.replace?.(/col\-/, '') ?? '';
  }
  return {
    getColumnsRef,
    getCacheColumns,
    getColumns,
    setColumns,
    getViewColumns,
    setCacheColumnsByField,
    getColumnsSlots,
    replaceColSlotKey
  };
}

function sortFixedColumn(columns: BasicColumn[]) {
  const fixedLeftColumns: BasicColumn[] = [];
  const fixedRightColumns: BasicColumn[] = [];
  const defColumns: BasicColumn[] = [];
  for (const column of columns) {
    if (column.fixed === 'left') {
      fixedLeftColumns.push(column);
      continue;
    }
    if (column.fixed === 'right') {
      fixedRightColumns.push(column);
      continue;
    }
    defColumns.push(column);
  }
  return [...fixedLeftColumns, ...defColumns, ...fixedRightColumns].filter(
    (item) => !item.defaultHidden
  );
}

// format cell
export function formatCell(
  text: string | dayjs.Dayjs,
  format: CellFormat,
  record: Recordable,
  index: number
) {
  if (!format) {
    return text;
  }

  // custom function
  if (isFunction(format)) {
    return format(text as string, record, index);
  }

  try {
    // date type
    const DATE_FORMAT_PREFIX = 'date|';
    if (isString(format) && format.startsWith(DATE_FORMAT_PREFIX)) {
      const dateFormat = format.replace(DATE_FORMAT_PREFIX, '');

      if (!dateFormat) {
        return text;
      }
      return formatToDate(text as dayjs.Dayjs, dateFormat);
    }

    // Map
    if (isMap(format)) {
      return format.get(text as string | number);
    }
  } catch (error) {
    return text;
  }
}
