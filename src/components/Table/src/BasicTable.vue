<template>
  <div ref="wrapRef" :class="getWrapperClass">
    <BasicForm
      v-if="getBindValues.useSearchForm"
      submitOnReset
      v-bind="getFormProps"
      :tableAction="tableAction"
      @register="registerForm"
      @submit="handleSearchInfoChange"
      @advanced-change="redoHeight"
    >
      <template #[replaceFormSlotKey(item)]="data" v-for="item in getFormSlotKeys">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </BasicForm>
    <UseTableHeader :propsRef="getBindValues" :slots="$slots" />
    <ElTable
      ref="tableElRef"
      v-bind="getBindValues"
      :rowClassName="getRowClassName"
      v-show="getEmptyDataIsShowTable"
      tooltip-effect="light"
    >
      <ElTableColumn
        v-if="showSelect"
        type="selection"
        :selectable="getBindValues.selectableFun"
        width="55"
      />

      <ElTableColumn
        v-for="(columnItem, index) in columns"
        show-overflow-tooltip
        :key="index"
        :prop="columnItem.prop"
        :label="columnItem.customTitle"
        :width="columnItem.width"
        :formatter="columnItem.formatter"
      >
        <template #default="{ row, column }">
          <RenderContent
            :row="row"
            :column="columnItem"
            :field="column.property"
            :getColumnsSlots="getColumnsSlots"
          >
            <template v-for="i in getColumnsSlots" #[i]>
              <slot :name="i" :row="row" :column="column"></slot>
            </template>
          </RenderContent>
        </template>
      </ElTableColumn>
    </ElTable>

    <Pagination
      v-if="pagiantion"
      v-bind="getPaginationInfo"
      v-model:page="pagiantion.current"
      v-model:limit="pagiantion.pageSize"
      @pagination-change="handleTableChange"
    />
  </div>
</template>
<script lang="ts">
import type { BasicTableProps, TableActionType, SizeType, ColumnChangeParam } from './types/table';

import {
  defineComponent,
  ref,
  computed,
  unref,
  toRaw,
  inject,
  watchEffect,
  onMounted,
  nextTick,
  toRef,
  reactive
} from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';
import { BasicForm, useForm } from '/@/components/Form/index';
import { PageWrapperFixedHeightKey } from '/@/components/Page';
import HeaderCell from './components/HeaderCell.vue';
import TableColumn from './components/TableColumn.vue';
import { InnerHandlers } from './types/table';

import { usePagination } from './hooks/usePagination';
import { useColumns } from './hooks/useColumns';
import { useDataSource } from './hooks/useDataSource';
import { useLoading } from './hooks/useLoading';
import { useRowSelection } from './hooks/useRowSelection';
import { useTableScroll } from './hooks/useTableScroll';
import { useCustomRow } from './hooks/useCustomRow';
import { useTableStyle } from './hooks/useTableStyle';
import { useTableHeader } from './hooks/useTableHeader';
import { useTableExpand } from './hooks/useTableExpand';
import { createTableContext } from './hooks/useTableContext';
import { useTableFooter } from './hooks/useTableFooter';
import { useTableForm } from './hooks/useTableForm';
import { useDesign } from '/@/hooks/web/useDesign';
import ColumnContent from './components/baseColumnContent/content.vue';
import RenderContent from './components/baseColumnContent/renderContent.tsx';

import { omit } from 'lodash-es';
import { basicProps } from './props';
// import { isFunction } from '/@/utils/is';
import { warn } from '/@/utils/log';
import { Pagination } from '/@/components/Pagination';
export default defineComponent({
  components: {
    ElTable,
    BasicForm,
    HeaderCell,
    TableColumn,
    Pagination,
    ElTableColumn,
    ColumnContent,
    UseTableHeader: useTableHeader,
    RenderContent
  },
  props: basicProps,
  emits: [
    'fetch-success',
    'fetch-error',
    'selection-change',
    'register',
    'row-click',
    'row-dbClick',
    'row-contextmenu',
    'cell-mouse-enter',
    'cell-mouse-leave',
    'edit-end',
    'edit-cancel',
    'edit-row-end',
    'edit-change',
    'expanded-rows-change',
    'change',
    'columns-change'
  ],
  setup(props, { attrs, emit, slots, expose }) {
    const tableElRef = ref();
    const tableData = ref<Recordable[]>([]);

    const wrapRef = ref(null);
    const innerPropsRef = ref<Partial<BasicTableProps>>();

    const { prefixCls } = useDesign('basic-table');
    const [registerForm, formActions] = useForm();
    const pagiantion = props.pagination;

    const getProps = computed(() => {
      return { ...props, ...unref(innerPropsRef) } as BasicTableProps;
    });

    const isFixedHeightPage = inject('PageWrapperFixedHeight', false);
    watchEffect(() => {
      unref(isFixedHeightPage) &&
        props.canResize &&
        warn(
          "'canResize' of BasicTable may not work in PageWrapper with 'fixedHeight' (especially in hot updates)"
        );
    });

    const { getLoading, setLoading } = useLoading(getProps);

    const {
      showSelect,
      getRowSelection,
      getRowSelectionRef,
      getSelectRows,
      clearSelectedRowKeys,
      getSelectRowKeys,
      deleteSelectRowByKey,
      setSelectedRowKeys,
      toggleTableSelect,
      cancelSelectRow
    } = useRowSelection(getProps, tableData, emit, tableElRef);

    const {
      getPaginationInfo,
      getPagination,
      setPagination,
      setShowPagination,
      getShowPagination
    } = usePagination(getProps, pagiantion);
    const {
      handleTableChange: onTableChange,
      getDataSourceRef,
      getDataSource,
      getRawDataSource,
      setTableData,
      updateTableDataRecord,
      deleteTableDataRecord,
      insertTableDataRecord,
      findTableDataRecord,
      fetch,
      getRowKey,
      reload,
      getAutoCreateKey,
      updateTableData
    } = useDataSource(
      getProps,
      {
        tableData,
        getPaginationInfo,
        setLoading,
        setPagination,
        getFieldsValue: formActions.getFieldsValue,
        clearSelectedRowKeys,
        getPagination,
        toggleTableSelect
      },
      emit
    );

    function handleTableChange(pagiantion) {
      onTableChange(pagiantion);
      // onTableChange.call(undefined, ...args);
      // emit('change', ...args);
      // // 解决通过useTable注册onChange时不起作用的问题
      // const { onChange } = unref(getProps);
      // onChange && isFunction(onChange) && onChange.call(undefined, ...args);
    }

    const {
      getViewColumns,
      getColumns,
      setCacheColumnsByField,
      setColumns,
      getColumnsRef,
      getCacheColumns,
      getColumnsSlots,
      replaceColSlotKey
    } = useColumns(getProps, getPaginationInfo, slots);

    const { getScrollRef, redoHeight } = useTableScroll(
      getProps,
      tableElRef,
      getColumnsRef,
      getRowSelectionRef,
      getDataSourceRef
    );

    const customRow = useCustomRow(getProps, {
      setSelectedRowKeys,
      getSelectRowKeys,
      clearSelectedRowKeys,
      getAutoCreateKey,
      emit,
      cancelSelectRow
    });

    const { getRowClassName } = useTableStyle(getProps, prefixCls);

    const { getExpandOption, expandAll, collapseAll } = useTableExpand(getProps, tableData, emit);

    const handlers: InnerHandlers = {
      onColumnsChange: (data: ColumnChangeParam[]) => {
        emit('columns-change', data);
        // support useTable
        unref(getProps).onColumnsChange?.(data);
      }
    };

    // const { getHeaderProps } = useTableHeader(getProps, slots, handlers);

    const { getFooterProps } = useTableFooter(getProps, getScrollRef, tableElRef, getDataSourceRef);

    const { getFormProps, replaceFormSlotKey, getFormSlotKeys, handleSearchInfoChange } =
      useTableForm(getProps, slots, fetch, getLoading);

    const getBindValues = computed(() => {
      const dataSource = unref(getDataSourceRef);

      let propsData: Recordable = {
        ...attrs,
        ...customRow,
        ...unref(getProps),

        scroll: unref(getScrollRef),
        // loading: unref(getLoading),
        tableLayout: 'fixed',
        ...unref(getRowSelectionRef),
        // rowKey: unref(getRowKey),
        columns: toRaw(unref(getViewColumns)),

        data: tableData.value,

        ...unref(getExpandOption)
      };
      if (slots.expandedRowRender) {
        propsData = omit(propsData, 'scroll');
      }

      propsData = omit(propsData, ['class', 'onChange']);

      // if (showSelect) {
      //   setSelectedRowKeys([...getSelectRowKeys()]);
      // }
      // console.log('dataSource', propsData);
      return propsData;
    });

    const getWrapperClass = computed(() => {
      const values = unref(getBindValues);
      return [
        prefixCls,
        attrs.class,
        {
          [`${prefixCls}-form-container`]: values.useSearchForm,
          [`${prefixCls}--inset`]: values.inset
        }
      ];
    });

    const getEmptyDataIsShowTable = computed(() => {
      const { emptyDataIsShowTable, useSearchForm } = unref(getProps);
      if (emptyDataIsShowTable || !useSearchForm) {
        return true;
      }
      return !!unref(getDataSourceRef).length;
    });

    function setProps(props: Partial<BasicTableProps>) {
      innerPropsRef.value = { ...unref(innerPropsRef), ...props };
    }

    const tableAction: TableActionType = {
      reload,
      getSelectRows,
      clearSelectedRowKeys,
      getSelectRowKeys,
      deleteSelectRowByKey,
      setPagination,
      setTableData,
      updateTableDataRecord,
      deleteTableDataRecord,
      insertTableDataRecord,
      findTableDataRecord,
      redoHeight,
      setSelectedRowKeys,
      setColumns,
      setLoading,
      getDataSource,
      getRawDataSource,
      setProps,
      getRowSelection,
      getPaginationRef: getPagination,
      getColumns,
      getCacheColumns,
      emit,
      updateTableData,
      setShowPagination,
      getShowPagination,
      setCacheColumnsByField,
      expandAll,
      collapseAll,
      getSize: () => {
        return unref(getBindValues).size as SizeType;
      }
    };
    createTableContext({ ...tableAction, wrapRef, getBindValues });

    expose(tableAction);

    emit('register', tableAction, formActions);

    return {
      tableElRef,
      getBindValues,
      getLoading,
      registerForm,
      handleSearchInfoChange,
      getEmptyDataIsShowTable,
      handleTableChange,
      getRowClassName,
      wrapRef,
      tableAction,
      redoHeight,
      getFormProps: getFormProps as any,
      replaceFormSlotKey,
      getFormSlotKeys,
      getWrapperClass,
      columns: getViewColumns,
      getPaginationInfo,
      pagiantion,
      showSelect,
      getColumnsSlots,
      replaceColSlotKey
    };
  }
});
</script>
<style lang="less">
@border-color: #cecece4d;

@prefix-cls: ~'@{namespace}-basic-table';

[data-theme='dark'] {
  .el-table-tbody > tr:hover.el-table-row-selected > td,
  .el-table-tbody > tr.el-table-row-selected td {
    background-color: #262626;
  }
}

.@{prefix-cls} {
  max-width: 100%;

  &-row__striped {
    td {
      background-color: @app-content-background;
    }
  }

  &-form-container {
    padding: 16px;

    .el-form {
      padding: 12px 10px 6px;
      margin-bottom: 16px;
      background-color: @component-background;
      border-radius: 2px;
    }
  }

  .el-tag {
    margin-right: 0;
  }

  .el-table-wrapper {
    padding: 6px;
    background-color: @component-background;
    border-radius: 2px;

    .el-table-title {
      min-height: 40px;
      padding: 0 0 8px !important;
    }

    .el-table.el-table-bordered .el-table-title {
      border: none !important;
    }
  }

  .el-table {
    width: 100%;
    overflow-x: hidden;

    &-title {
      display: flex;
      padding: 8px 6px;
      border-bottom: none;
      justify-content: space-between;
      align-items: center;
    }

    //.el-table-tbody > tr.el-table-row-selected td {
    //background-color: fade(@primary-color, 8%) !important;
    //}
  }

  .el-pagination {
    margin: 10px 0 0;
  }

  .el-table-footer {
    padding: 0;

    .el-table-wrapper {
      padding: 0;
    }

    table {
      border: none !important;
    }

    .el-table-body {
      overflow-x: hidden !important;
      //  overflow-y: scroll !important;
    }

    td {
      padding: 12px 8px;
    }
  }

  &--inset {
    .el-table-wrapper {
      padding: 0;
    }
  }
}
</style>
