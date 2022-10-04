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
    @columns-change="handleColumnChange"
    @register="registerTable"
  >
    <template #form-advanceBefore>
      <el-button type="danger" @click="toggleCanResize({})">新增</el-button>
    </template>
    <template #col-operate="{ row, column }">
      <el-button size="small" type="primary" @click="toggleCanResize(row, 3)">查看</el-button>
      <el-button size="small" type="primary" @click="toggleCanResize(row, 2)">编辑</el-button>
      <ElPopconfirm title="Are you sure to delete this?" @confirm="handelDelete(row, column)">
        <template #reference>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </ElPopconfirm>
    </template>
  </BasicTable>
  <BasicModal ref="modalRef" @ok="sureEditForm('edit')" :height="500">
    <template v-if="clickType === 3">
      <TimeQuantum ref="timeRef" :promotionRow="editRow" />
    </template>

    <BasicForm
      v-else
      @register="registerForm"
      :model="editRow"
      :schemas="formSchema"
      :showActionBtn="false"
    />
    <template v-if="clickType === 3" #insertFooter>
      <ElButton type="success" @click="sureClick">新增</ElButton>
    </template>
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, onMounted, unref } from 'vue';
import { ElPopconfirm,  } from 'element-plus';
import { BasicTable, ColumnChangeParam, useTable } from '/@/components/Table';
import { getCoupColumns, getFormConfig, getEditCoupSchema } from './promotionData';
import { couponList, updateCoupon, addCoupon, deletecCoupon } from '/@/api/sys/promotion';
import { BasicModal } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import TimeQuantum from './timeQuantum.vue';
import {CoupListItem} from './type'
import {FormSchema } from '/@/components/Form/src/types/form';

const canResize = ref(false);
const modalRef = ref<{visibleRef: boolean}>(false);
const timeRef = ref();
const editRow = ref<Partial<CoupListItem>>({});
const loading = ref(false);
const clickType = ref(0);
const formSchema = ref<FormSchema[]>([]);
formSchema.value = getEditCoupSchema;
const pagination = reactive({
  pageSize: 10,
  pageNum: 1
});

let api = couponList;
function toggleCanResize(row, type) {
  clickType.value = type;

  editRow.value = row && row.id ? row : {};
  console.log('editRow', editRow);

  unref(modalRef).visibleRef = true;
}

function handleColumnChange(data: ColumnChangeParam[]) {
  // console.log('ColumnChanged', data);
}
const [registerForm, formActions] = useForm();

let columns = getCoupColumns();

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

let sureEditForm = async (type) => {
  if (unref(editRow).id) {
    let item = type ? { ...formActions.getFieldsValue(), id: unref(editRow).id } : unref(editRow);

    await updateCoupon(item).then((res) => {
      if (res) {
        unref(modalRef).visibleRef = false;
        reload();
        return true;
      }
    });
  } else {
    let item = formActions.getFieldsValue();

    addCoupon(item).then((res) => {
      if (res) {
        unref(modalRef).visibleRef = false;
        reload();
        return true;
      }
    });
  }
  return false;
};
function handelDelete(row, column) {
  deletecCoupon({ id: row.id }).then((res) => {
    if (res.code === 200) {
      reload();
    }
  });
}

const sureClick = () => {
  unref(timeRef).toggleCanResize({}, null);
};
let data = [];
</script>
