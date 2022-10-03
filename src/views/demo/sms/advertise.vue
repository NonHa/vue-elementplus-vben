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
    <template #col-status="{ row, column }">
      <ElSwitch
        v-model="row.status"
        class="ml-2"
        :active-value="1"
        :inactive-value="0"
        :before-change="() => switchChange(row, 'status')"
      />
    </template>
    <template #col-operate="{ row, column }">
      <el-button size="small" type="primary" @click="toggleCanResize(row, 2)">编辑</el-button>
      <ElPopconfirm title="Are you sure to delete this?" @confirm="handelDelete(row, column)">
        <template #reference>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </ElPopconfirm>
    </template>
  </BasicTable>
  <BasicModal ref="modalRef" @ok="sureEditForm('edit')" :height="500">
    <BasicForm
      @register="registerForm"
      :model="editRow"
      :schemas="formSchema"
      :showActionBtn="false"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, onMounted, unref } from 'vue';
import { ElPopconfirm, ElSwitch } from 'element-plus';
import { BasicTable, ColumnChangeParam, useTable } from '/@/components/Table';
import {
  getAderviseColumns,
  getFormConfig,
  getAdvertiseSchema,
  getEditAdvertiseSchema
} from './promotionData';
import {
  getAdvertiseList,
  updateAdvertise,
  addAdvertise,
  deleteAdvertise
} from '/@/api/sys/promotion';
import { BasicModal } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';

import {AdvertiseItem} from './type'
import {  FormSchema } from '/@/components/Form/src/types/form';

const canResize = ref(false);
const modalRef = ref(false);
const timeRef = ref();
const editRow = ref<Partial<AdvertiseItem>>({});
const loading = ref(false);
const clickType = ref(0);
const formSchema = ref<FormSchema[]>([]);
formSchema.value = getEditAdvertiseSchema;
const pagination = reactive({
  pageSize: 10,
  pageNum: 1
});

let api = getAdvertiseList;
function toggleCanResize(row:AdvertiseItem, type) {
  clickType.value = type;

  editRow.value = row && row.id ? row : {};
  console.log('editRow', editRow);

  unref(modalRef).visibleRef = true;
}

function handleColumnChange(data: ColumnChangeParam[]) {
  // console.log('ColumnChanged', data);
}
const [registerForm, formActions] = useForm();

function btnClick() {
  // console.log('btnClick');
}
let columns = getAderviseColumns();

const [registerTable, { getForm, reload }] = useTable({
  api: api,
  columns,
  useSearchForm: true,
  formConfig: {
    labelWidth: 100,
    schemas: getAdvertiseSchema()
  },
  showTableSetting: true,
  tableSetting: { fullScreen: true },
  showIndexColumn: false,
  rowKey: 'key',
  isTreeTable: true
});

let sureEditForm = async (type) => {
  if (unref(editRow).id) {
    let item =( type ? { ...formActions.getFieldsValue(), id: unref(editRow).id } : unref(editRow)) as AdvertiseItem ;

    await updateAdvertise(item).then((res) => {
      if (res) {
        unref(modalRef).visibleRef = false;
        reload();
        return true;
      }
    });
  } else {
    let item = formActions.getFieldsValue();

    addAdvertise(item).then((res) => {
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
  deleteAdvertise({ id: row.id }).then((res) => {
    if (res.code === 200) {
      reload();
    }
  });
}

let data = [];
const switchChange = async (row, filed) => {
  editRow.value = row;
  unref(editRow)[filed] = unref(editRow)[filed] === 0 ? 1 : 0;
  return sureEditForm();
};
</script>
