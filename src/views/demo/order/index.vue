<template>
  <BasicTable
    titleHelpMessage="温馨提醒"
    :columns="columns"
    :dataSource="data"
    :canResize="canResize"
    :loading="loading"
    showTableSetting
    :pagination="pagination"
    :beforeFetch="beforeFetch"
    :tableSearchQuery="{ pageNum: 1, pageSize: 50 }"
    :api="api"
    useSearchForm
    :columnSelectInit="{
      selectable: selectableFun,
      initSelectRows: [1, 2, 3]
    }"
    :rowSelection="{
      type: 'checkbox'
    }"
    @columns-change="handleColumnChange"
    @register="registerTable"
  >
    <template #col-operate="{ row, column }">
      <el-button size="small" type="primary" @click="toggleCanResize">查看订单</el-button>
      <ElPopconfirm title="Are you sure to delete this?" @confirm="handelDelete(row, column)">
        <template #reference>
          <el-button size="small" type="danger">删除订单</el-button>
        </template>
      </ElPopconfirm>
    </template>
  </BasicTable>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { ElPopconfirm } from 'element-plus';
import { BasicTable, ColumnChangeParam, useTable } from '/@/components/Table';
import { getBasicColumns, getFormConfig, getTreeTableData } from './orderData';
import { getOrderList, deleteOrderById } from '/@/api/sys/order';
import { useProductStore } from '/@/store/modules/product';

const canResize = ref(false);
const loading = ref(false);
const pagination = reactive({
  pageSize: 10,
  pageNum: 1
});

let api = getOrderList;
function toggleCanResize() {
  canResize.value = !canResize.value;
}

function handleColumnChange(data: ColumnChangeParam[]) {
  // console.log('ColumnChanged', data);
}
function btnClick() {
  // console.log('btnClick');
}
let columns = getBasicColumns();
columns[1].editEvnets = {
  input: btnClick
};

// const checkedKeys = ref<Array<string | number>>([]);

const [registerTable, { getForm, reload }] = useTable({
  api: api,
  columns,
  useSearchForm: true,
  formConfig: {
    ...getFormConfig()
  },
  showTableSetting: true,
  tableSetting: { fullScreen: true },
  showIndexColumn: false,
  rowKey: 'key',
  isTreeTable: true
});
let beforeFetch = (params) => {
  let obj = params;
  obj.productCategoryId = obj.category && obj.category[1];
  delete obj.category;
  return obj;
};

function selectableFun(row, index) {
  return true;
}
function initSelectRows(key) {}

function handelDelete(row, column) {
  deleteOrderById({ id: row.id }).then((res) => {
    if (res) {
      reload();
    }
  });
}
let data = [];
</script>
