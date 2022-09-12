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
      <el-button type="danger" @click="toggleCanResize">新增</el-button>
    </template>
    <template #col-operate="{ row, column }">
      <el-button size="small" type="primary" @click="setRoleMenu(row, 1)">分配菜单</el-button>
      <el-button size="small" type="primary" @click="setRoleMenu(row, 2)">分配资源</el-button>
      <el-button size="small" type="primary" @click="toggleCanResize(row, 3)">编辑</el-button>
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
    <SetMenu ref="menuRef" v-if="clickType === 1" :menuAutoCheckKeys="menuAutoCheckKeys" />
    <Resource ref="resouceRef" v-else-if="clickType === 2" :menuAutoCheckKeys="menuAutoCheckKeys" />
    <BasicForm
      v-else
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
import { getBasicColumns, getFormConfig, getEditUserSchema } from './roleData';
import {
  roleList,
  updateRoleById,
  addRole,
  addRoleMenu,
  getlistMenuById,
  getlistResourceById,
  addRoleResource
} from '/@/api/sys/user';
import { BasicModal } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import SetMenu from './menu.vue';
import Resource from './resource.vue';
const canResize = ref(false);
const modalRef = ref(false);
const resouceRef = ref();
const editRow = ref({});
const loading = ref(false);
const menuRef = ref();
const menuAutoCheckKeys = ref([]);
const pagination = reactive({
  pageSize: 10,
  pageNum: 1
});
let clickType = ref(0);
let api = roleList;
function toggleCanResize(row, type) {
  clickType.value = type;
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
  clickType.value = 3;
  unref(editRow).status = unref(editRow).status === 0 ? 1 : 0;
  return await sureEditForm(null);
}

let sureEditForm = async (type) => {
  if (unref(clickType) === 1 || unref(clickType) === 2) {
    let obj = unref(clickType) === 1 ? addRoleMenu : addRoleResource;
    let ref = unref(clickType) === 1 ? menuRef : resouceRef;
    let filed = unref(clickType) === 1 ? 'menuIds' : 'resourceIds';
    obj({ roleId: unref(editRow).id, [filed]: ref.value.getCheckedKeys().join() }).then((res) => {
      if (res.code === 200) {
        menuAutoCheckKeys.value = [];
        unref(modalRef).visibleRef = false;
      }
    });
  } else {
    if (unref(editRow).id) {
      let item = type ? { ...formActions.getFieldsValue(), id: unref(editRow).id } : unref(editRow);
      await updateRoleById(item).then((res) => {
        if (res) {
          unref(modalRef).visibleRef = false;
          reload();
          return true;
        }
      });
    } else {
      addRole(formActions.getFieldsValue()).then((res) => {
        if (res) {
          unref(modalRef).visibleRef = false;
          reload();
          return true;
        }
      });
    }
    return false;
  }
};

const setRoleMenu = async (row, type) => {
  let obj = type === 1 ? getlistMenuById : getlistResourceById;
  let { data } = await obj({ roleId: row.id });
  menuAutoCheckKeys.value = data.list.map((v) => v.id);
  clickType.value = type;
  editRow.value = row;

  unref(modalRef).visibleRef = true;
};
function handelDelete(row, column) {
  editRow.value = row;
  unref(editRow).status = 0;
  sureEditForm(null);
}
let data = [];
</script>
