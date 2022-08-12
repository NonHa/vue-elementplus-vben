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
      <el-button type="danger" @click="toggleCanResize(null, 3)">秒杀时间段列表</el-button>
      <el-button type="danger" @click="toggleCanResize">新增</el-button>
    </template>
    <template #col-operate="{ row, column }">
      <el-button size="small" type="primary" @click="toggleCanResize(row, 3)">设置商品</el-button>
      <el-button size="small" type="primary" @click="toggleCanResize(row, 2)">编辑</el-button>
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
import { ElPopconfirm, ElSwitch } from 'element-plus';
import { BasicTable, ColumnChangeParam, useTable } from '/@/components/Table';
import { getBasicColumns, getFormConfig, getEditUserSchema } from './promotionData';
import { getFlashList, updateFlashById, addFlash } from '/@/api/sys/promotion';
import { BasicModal } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { useProductStore } from '/@/store/modules/product';
import { formatToDateTime } from '/@/utils/dateUtil';
import TimeQuantum from './timeQuantum.vue';
const { getRoleList } = useProductStore();

const canResize = ref(false);
const modalRef = ref(false);
const timeRef = ref();
const editRow = ref({});
const loading = ref(false);
const clickType = ref(0);
const formSchema = ref([]);
formSchema.value = getEditUserSchema;
const pagination = reactive({
  pageSize: 10,
  pageNum: 1
});

let api = getFlashList;
function toggleCanResize(row, type) {
  clickType.value = type;
  if (type === 1) {
    formSchema.value = [
      {
        field: `roleIds`,
        label: `上级分类`,
        component: 'ElSelect',
        itemProps: {
          multiple: true
        },
        searchList: getRoleList.map((v) => {
          return {
            label: v.name,
            value: v.id
          };
        })
        // itemProps: itemPropsCommon
      }
    ];
  } else {
    formSchema.value = getEditUserSchema;
  }
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

async function switchChange(row) {
  editRow.value = row;
  clickType.value = 2;
  unref(editRow).status = unref(editRow).status === 0 ? 1 : 0;
  return await sureEditForm();
}

let sureEditForm = async (type) => {
  if (unref(clickType) === 1) {
    updateUserRole({ adminId: unref(editRow).id, ...formActions.getFieldsValue() }).then((res) => {
      unref(modalRef).visibleRef = false;
      reload();
    });
    return;
  }
  if (unref(editRow).id) {
    let item = type ? { ...formActions.getFieldsValue(), id: unref(editRow).id } : unref(editRow);
    item.startDate = formatToDateTime(item.startDate);
    item.endDate = formatToDateTime(item.endDate);
    await updateFlashById(item).then((res) => {
      if (res) {
        unref(modalRef).visibleRef = false;
        reload();
        return true;
      }
    });
  } else {
    let item = formActions.getFieldsValue();
    item.startDate = formatToDateTime(item.startDate);
    item.endDate = formatToDateTime(item.endDate);
    addFlash(item).then((res) => {
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
  clickType.value = 2;

  unref(editRow).status = 0;
  sureEditForm();
}

const sureClick = () => {
  unref(timeRef).toggleCanResize({}, null);
};
let data = [];
</script>
