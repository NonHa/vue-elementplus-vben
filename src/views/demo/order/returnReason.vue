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
    <template #form-advanceBefore>
      <el-button type="danger" @click="toggleCanResize">新增</el-button>
      <el-button type="danger" @click="deleteFun">删除</el-button>
    </template>
    <template #col-operate="{ row, column }">
      <el-button size="small" type="primary" @click="toggleCanResize(row)">编辑</el-button>
      <ElPopconfirm
        title="Are you sure to delete this?"
        @confirm="eidtItem({ ...row, status: 0 }, column)"
      >
        <template #reference>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </ElPopconfirm>
    </template>
  </BasicTable>

  <BasicModal ref="modalRef" @ok="eidtItem">
    <BasicForm
      @register="registerForm"
      :model="editRow"
      :schemas="getReturnReasonSchema"
      :showActionBtn="false"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, onMounted, unref } from 'vue';
import { ElPopconfirm } from 'element-plus';
import { BasicTable, ColumnChangeParam, useTable } from '/@/components/Table';
import {
  getReturnReasonColumns,
  getReasonConfig,
  getTreeTableData,
  getReturnReasonSchema
} from './orderData';
import {
  orderReturnReasonList,
  deleteOrderById,
  updateOrderReturnReason,
  addOrderReturnReason,
  deleteOrderReturnReason
} from '/@/api/sys/order';
import { BasicModal } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { ReturnReasonItem } from './type'; 
const canResize = ref(false);
const loading = ref(false);
const pagination = reactive({
  pageSize: 10,
  pageNum: 1
});
let modalRef = ref();
const editRow = ref<Partial<ReturnReasonItem>>({});
let api = orderReturnReasonList;
function toggleCanResize(row) {
  editRow.value = row && row.id ? row : { sort: 0, status: 1 };
  unref(modalRef).visibleRef = true;
}

function btnClick() {
  // console.log('btnClick');
}
let columns = getReturnReasonColumns();
columns[1].editEvnets = {
  input: btnClick
};

// const checkedKeys = ref<Array<string | number>>([]);

const [registerTable, { getForm, reload }] = useTable({
  api: api,
  columns,
  useSearchForm: true,
  formConfig: {
    ...getReasonConfig()
  },
  showTableSetting: true,
  tableSetting: { fullScreen: true },
  showIndexColumn: false,
  rowKey: 'key',
  isTreeTable: true
});
const [registerForm, formActions] = useForm();

let beforeFetch = (params) => {
  let obj = params;
  obj.productCategoryId = obj.category && obj.category[1];
  delete obj.category;
  return obj;
};

function selectableFun(row, index) {
  return true;
}
function sureEditForm() {}

function eidtItem(row, column) {
  let item = row && row.id ? row : { ...formActions.getFieldsValue(), id: editRow.value.id };
  let obj = item.id ? updateOrderReturnReason : addOrderReturnReason;
  obj({ ...item }).then((res) => {
    if (res.code === 200) {
      reload();
      unref(modalRef).visibleRef = false;
    }
  });
}

function deleteFun(row, column) {
  deleteOrderReturnReason({ ids: '1,2' }).then((res) => {
    if (res.code === 200) {
      reload();
      unref(modalRef).visibleRef = false;
    }
  });
}
let data = [];
</script>
