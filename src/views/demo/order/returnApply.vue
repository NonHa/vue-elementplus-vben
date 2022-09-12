<template>
  <BasicTable
    :columns="columns"
    :dataSource="data"
    :canResize="canResize"
    :loading="loading"
    showTableSetting
    :pagination="pagination"
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
      <el-button size="small" type="primary" @click="toggleCanResize(row)">查看详情</el-button>
    </template>
  </BasicTable>
  <BasicModal
    ref="modalRef"
    :height="600"
    :footerBtnOption="footerBtnOption"
    :showCancelBtn="showCancelBtn"
    :showOkBtn="showOkBtn"
    :closeFunc="closeFunc"
    @ok="handleOk"
  >
    <ReturnApplyItemMessage ref="messageRef" :applyItem="applyItem" />
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, onMounted, unref } from 'vue';
import { BasicTable, ColumnChangeParam, useTable } from '/@/components/Table';
import { getReturnApplyColumns, getReturnApplyFormConfig, getTreeTableData } from './orderData';
import { orderReturnAplyList, deleteOrderById, updateOrderReturnApply } from '/@/api/sys/order';
import { useUserStore } from '/@/store/modules/user';

import { BasicModal } from '/@/components/Modal';
import ReturnApplyItemMessage from './returnApplyItemMessage.vue';
const canResize = ref(false);
const loading = ref(false);
const pagination = reactive({
  pageSize: 10,
  pageNum: 1
});
let modalRef = ref();
let messageRef = ref();
let applyItem = ref({});
let showCancelBtn = ref(true);
let showOkBtn = ref(true);

let footerBtnOption = reactive<{
  cancelText?: string;
  sureText?: string;
}>({ cancelText: '', sureText: '' });
let api = orderReturnAplyList;
function toggleCanResize(row) {
  applyItem.value = unref(row);
  let status = unref(row).status;
  showCancelBtn.value = true;
  showOkBtn.value = true;
  if (status === 0) {
    footerBtnOption.cancelText = '拒绝退货';
    footerBtnOption.sureText = '确认退货';
  } else if (status === 1) {
    showCancelBtn.value = false;
    footerBtnOption.sureText = '确认收货';
  } else {
    showCancelBtn.value = false;
    showOkBtn.value = false;
  }
  unref(modalRef).visibleRef = true;
}

function handleColumnChange(data: ColumnChangeParam[]) {
  // console.log('ColumnChanged', data);
}

let columns = getReturnApplyColumns();

// const checkedKeys = ref<Array<string | number>>([]);

const [registerTable, { getForm, reload }] = useTable({
  api: api,
  columns,
  useSearchForm: true,
  formConfig: {
    ...getReturnApplyFormConfig()
  },
  showTableSetting: true,
  tableSetting: { fullScreen: true },
  showIndexColumn: false,
  rowKey: 'key',
  isTreeTable: true
});

function selectableFun(row, index) {
  return true;
}

function handelDelete(row, column) {
  deleteOrderById({ id: row.id }).then((res) => {
    if (res) {
      reload();
    }
  });
}

let data = [];
const { getUserInfo } = useUserStore();
function handleOk() {
  // return;
  let param = unref(messageRef).selectAddress;
  updateOrderReturnApply({
    ...param,
    status: unref(applyItem).status + 1,
    id: unref(applyItem).id,

    receiveMan: getUserInfo.username,
    handleMan: getUserInfo.username
  }).then((res) => {
    if (res.code === 200) {
      unref(modalRef).visibleRef = false;

      reload();
    }
  });
}

async function closeFunc() {
  let param = unref(messageRef).selectAddress;
  if (unref(applyItem).status === 0) {
    let data = await updateOrderReturnApply({
      ...param,
      status: 3,
      id: unref(applyItem).id,
      receiveMan: getUserInfo.username,
      handleMan: getUserInfo.username
    });
    if (data.code === 200) {
      reload();
    }
    return data.code === 200;
  }
}
</script>
