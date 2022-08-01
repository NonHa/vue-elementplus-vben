<template>
  <BasicTable
    titleHelpMessage="温馨提醒"
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
      <el-button type="danger" @click="toggleCanResize">新增</el-button>
    </template>
    <template #col-operate="{ row, column }">
      <el-button size="small" type="primary" @click="toggleCanResize(row)">编辑</el-button>
      <ElPopconfirm title="Are you sure to delete this?" @confirm="handelDelete(row, column)">
        <template #reference>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </ElPopconfirm>
    </template>

    <template #col-status="{ row, column }">
      <ElSwitch
        v-model="row.status"
        class="ml-2"
        :active-value="1"
        :inactive-value="0"
        :before-change="() => switchChange(row)"
      />
    </template>
  </BasicTable>
  <BasicModal ref="modalRef" @ok="sureEditForm('edit')">
    <BasicForm
      @register="registerForm"
      :model="editRow"
      :schemas="getEditUserSchema"
      :showActionBtn="false"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, onMounted, unref } from 'vue';
import { ElPopconfirm, ElSwitch } from 'element-plus';
import { BasicTable, ColumnChangeParam, useTable } from '/@/components/Table';
import { getBasicColumns, getFormConfig, getEditUserSchema } from './userData';
import { getUserList, updateUser, register } from '/@/api/sys/user';
import { BasicModal } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';

const canResize = ref(false);
const modalRef = ref(false);
const editRow = ref({});
const loading = ref(false);
const pagination = reactive({
  pageSize: 10,
  pageNum: 1
});

let api = getUserList;
function toggleCanResize(row) {
  editRow.value = row && row.id ? row : { status: 1 };
  unref(modalRef).visibleRef = true;
}

function handleColumnChange(data: ColumnChangeParam[]) {
  // console.log('ColumnChanged', data);
}
const [registerForm, formActions] = useForm();

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

function selectableFun(row, index) {
  return true;
}
async function switchChange(row) {
  editRow.value = row;
  unref(editRow).status = unref(editRow).status === 0 ? 1 : 0;
  return await sureEditForm();
}

let sureEditForm = async (type) => {
  if (unref(editRow).id) {
    let item = type ? { ...formActions.getFieldsValue(), id: unref(editRow).id } : unref(editRow);
    await updateUser(item).then((res) => {
      if (res) {
        unref(modalRef).visibleRef = false;
        reload();
        return true;
      }
    });
  } else {
    register(formActions.getFieldsValue()).then((res) => {
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
  editRow.value = row;
  unref(editRow).status = 0;
  sureEditForm();
}
let data = [];
</script>
