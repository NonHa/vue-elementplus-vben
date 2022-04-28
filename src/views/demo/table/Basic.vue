<template>
  <div class="p-4">
    <BasicTable
      title="基础示例"
      titleHelpMessage="温馨提醒"
      :columns="columns"
      :dataSource="data"
      :canResize="canResize"
      :loading="loading"
      :striped="striped"
      :bordered="border"
      showTableSetting
      :pagination="pagination"
      :tableSearchQuery="{ pageNum: 1, pageSize: 50 }"
      :api="api"
      useSearchForm
      :columnSelectInit="{
        selectable: selectableFun,
        initSelectRows: [1, 2, 3],
      }"
      :rowSelection="{
        type: 'checkbox',
      }"
      @columns-change="handleColumnChange"
      @register="registerTable"
    >
      <template #toolbar>
        <el-button type="primary" @click="toggleCanResize">
          {{ !canResize ? '自适应高度' : '取消自适应' }}
        </el-button>
        <el-button type="primary" @click="toggleBorder">
          {{ !border ? '显示边框' : '隐藏边框' }}
        </el-button>
        <el-button type="primary" @click="toggleLoading"> 开启loading </el-button>
        <el-button type="primary" @click="toggleStriped">
          {{ !striped ? '显示斑马纹' : '隐藏斑马纹' }}
        </el-button>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, watch, onMounted } from 'vue';
  import { BasicTable, ColumnChangeParam, useTable } from '/@/components/Table';
  import { getBasicColumns, getBasicData, getFormConfig, getTreeTableData } from './tableData';
  import { getTreeList } from '/@/api/sys/table';
  export default defineComponent({
    components: { BasicTable },
    name: 'BasicTable',
    setup() {
      const canResize = ref(false);
      const loading = ref(false);
      const striped = ref(true);
      const border = ref(true);
      const pagination = reactive({
        pageSize: 10,
        pageNum: 1,
      });
      let api = getTreeList;
      function toggleCanResize() {
        canResize.value = !canResize.value;
      }
      function toggleStriped() {
        striped.value = !striped.value;
      }
      function toggleLoading() {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          // pagination.value = { pageSize: 20 };
        }, 3000);
      }
      function toggleBorder() {
        border.value = !border.value;
      }

      function handleColumnChange(data: ColumnChangeParam[]) {
        console.log('ColumnChanged', data);
      }
      // const checkedKeys = ref<Array<string | number>>([]);
      const [registerTable, { getForm }] = useTable({
        api: api,
        columns: getBasicColumns(),
        useSearchForm: true,
        formConfig: getFormConfig(),
        showTableSetting: true,
        tableSetting: { fullScreen: true },
        showIndexColumn: false,
        rowKey: 'key',
        isTreeTable: true,
      });

      function getFormValues() {
        console.log(getForm().getFieldsValue());
      }
      function selectableFun(row, index) {
        return true;
      }
      function initSelectRows(key) {}
      return {
        columns: getBasicColumns(),
        data: getBasicData(),
        canResize,
        loading,
        striped,
        border,
        toggleStriped,
        toggleCanResize,
        toggleLoading,
        toggleBorder,
        pagination,
        handleColumnChange,
        api,
        registerTable,
        getFormValues,
        selectableFun,
        initSelectRows,
      };
    },
  });
</script>
