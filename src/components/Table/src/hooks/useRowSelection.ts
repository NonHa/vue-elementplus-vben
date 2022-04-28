import { isFunction } from '/@/utils/is';
import type { BasicTableProps, TableRowSelection } from '../types/table';
import { computed, ComputedRef, nextTick, Ref, ref, toRaw, unref, watch } from 'vue';
import { ROW_KEY } from '../const';
import { omit } from 'lodash-es';
import { findNodeAll } from '/@/utils/helper/treeHelper';

export function useRowSelection(
  propsRef: ComputedRef<BasicTableProps>,
  tableData: Ref<Recordable[]>,
  emit: EmitType,
  tableElRef
) {
  const selectedRowKeysRef = ref<string[]>([]);
  const selectedRowRef = ref<Recordable[]>([]);
  const showSelect = ref<boolean>(false);

  const getRowSelectionRef = computed((): TableRowSelection | null => {
    const { columnSelectInit } = unref(propsRef);
    if (!columnSelectInit) {
      return null;
    }

    return {
      onChange: (selectedRowKeys: string[]) => {
        setSelectedRowKeys(selectedRowKeys);
      },
      onSelect: (selection, row) => {
        tableSelect(selection, row);
      },
      onSelectAll: (selection) => {},
      ...omit(columnSelectInit, ['onChange']),
    };
  });
  watch(
    () => unref(propsRef),
    (v) => {
      if (!!v.columnSelectInit) {
        showSelect.value = true;
        // v.columnSelectInit.initSelectRows && toggleTableSelect(v.columnSelectInit.initSelectRows);
      } else {
        showSelect.value = false;
      }
    }
  );
  // watch(
  //   () => unref(propsRef).columnSelectInit?.selectedRowKeys,
  //   (v: string[]) => {
  //     setSelectedRowKeys(v);
  //   }
  // );

  // watch(
  //   () => unref(selectedRowKeysRef),
  //   () => {
  //     nextTick(() => {
  //       const { columnSelectInit } = unref(propsRef);
  //       if (columnSelectInit) {
  //         const { onChange } = columnSelectInit;
  //         if (onChange && isFunction(onChange)) onChange(getSelectRowKeys(), getSelectRows());
  //       }
  //       emit('selection-change', {
  //         keys: getSelectRowKeys(),
  //         rows: getSelectRows(),
  //       });
  //     });
  //   },
  //   { deep: true }
  // );
  const toggleTableSelect = function (keys: any[]) {
    nextTick(() => {
      console.log('keys', keys);

      unref(keys).forEach((v) => {
        tableElRef.value!.toggleRowSelection(v, true);
      });
    });
  };
  const getAutoCreateKey = computed(() => {
    return unref(propsRef).autoCreateKey && !unref(propsRef).rowKey;
  });

  const getRowKey = computed(() => {
    const { rowKey } = unref(propsRef);
    return unref(getAutoCreateKey) ? ROW_KEY : rowKey;
  });

  function setSelectedRowKeys(rowKeys: string[]) {
    selectedRowKeysRef.value = rowKeys;

    const allSelectedRows = findNodeAll(
      toRaw(unref(tableData)),
      (item) => rowKeys.includes(item[unref(getRowKey) as string]),
      {
        children: propsRef.value.childrenColumnName ?? 'children',
      }
    );

    const trueSelectedRows: any[] = [];
    rowKeys.forEach((key: string) => {
      const found = allSelectedRows.find((item) => item[unref(getRowKey) as string] === key);
      nextTick(() => {
        tableElRef.value!.toggleRowSelection(found, true);
      });

      found && trueSelectedRows.push(found);
    });

    selectedRowRef.value = trueSelectedRows;
  }

  function setSelectedRows(rows: Recordable[]) {
    selectedRowRef.value = rows;
  }

  function clearSelectedRowKeys() {
    selectedRowRef.value = [];
    selectedRowKeysRef.value = [];
  }

  function deleteSelectRowByKey(key: string) {
    const selectedRowKeys = unref(selectedRowKeysRef);
    const index = selectedRowKeys.findIndex((item) => item === key);
    if (index !== -1) {
      unref(selectedRowKeysRef).splice(index, 1);
    }
  }

  function getSelectRowKeys() {
    return unref(selectedRowKeysRef);
  }

  function getSelectRows<T = Recordable>() {
    // const ret = toRaw(unref(selectedRowRef)).map((item) => toRaw(item));
    return unref(selectedRowRef) as T[];
  }

  function getRowSelection() {
    return unref(getRowSelectionRef)!;
  }
  function setSelectAllRow() {
    // nextTick(() => {
    // });
    // tableElRef.value.toggleRowSelection(tableData.value[0], undefined);
  }
  function tableSelect(selection, row) {
    // selectedRowRef.value = selection;
    let keys = selection.map((v) => v[unref(getRowKey) as string]);
    setSelectedRowKeys(keys);
  }
  function cancelSelectRow(key, rowKey) {
    const keyIndex = unref(selectedRowKeysRef).findIndex((item) => item === key);
    unref(selectedRowKeysRef).splice(keyIndex, 1);
    const rowIndex = unref(tableData).findIndex((v) => v[rowKey] === key);
    tableElRef.value!.toggleRowSelection(unref(tableData)[rowIndex], false);
    const rowRefIndex = unref(selectedRowRef).findIndex((v) => v[rowKey] === key);
    unref(selectedRowRef).splice(rowRefIndex, 1);
  }
  return {
    getRowSelection,
    getRowSelectionRef,
    getSelectRows,
    getSelectRowKeys,
    setSelectedRowKeys,
    clearSelectedRowKeys,
    deleteSelectRowByKey,
    setSelectedRows,
    setSelectAllRow,
    showSelect,
    toggleTableSelect,
    cancelSelectRow,
  };
}
