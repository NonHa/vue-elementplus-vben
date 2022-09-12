<template>
  <BasicTable
    title="基础示例"
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
    <template #col-address="{ row, column }">
      <el-button size="small" type="primary" @click="toggleCanResize">编辑</el-button>
      <ElPopconfirm title="Are you sure to delete this?" @confirm="handelDelete(row, column)">
        <template #reference>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </ElPopconfirm>
    </template>
    <template #col-pic="{ row }">
      <img :src="row.pic" />
    </template>
  </BasicTable>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { ElPopconfirm } from 'element-plus';
import { BasicTable, ColumnChangeParam, useTable } from '/@/components/Table';
import { getBasicColumns, getFormConfig } from './tableData';
import { getTreeList, deleteProduct } from '/@/api/sys/table';
import { useProductStore } from '/@/store/modules/product';

const canResize = ref(false);
const loading = ref(false);
const pagination = reactive({
  pageSize: 10,
  pageNum: 1
});

const { getProductCategoryList, getBrandList } = useProductStore();

let api = getTreeList;
function toggleCanResize() {
  canResize.value = !canResize.value;
}

function handleColumnChange(data: ColumnChangeParam[]) {
  // console.log('ColumnChanged', data);
}

let columns = getBasicColumns();

// const checkedKeys = ref<Array<string | number>>([]);

const [registerTable, { getForm, reload }] = useTable({
  api: api,
  columns,
  useSearchForm: true,
  formConfig: {
    ...getFormConfig(getProductCategoryList, getBrandList)
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

function handelDelete(row, column) {
  deleteProduct({ ids: row.id, deleteStatus: 1 }).then((res) => {
    if (res) {
      reload();
    }
  });
}
let data = [];
</script>
