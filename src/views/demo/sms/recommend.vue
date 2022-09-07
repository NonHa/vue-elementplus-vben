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
    @register="registerTable"
  >
    <template #form-advanceBefore>
      <el-button type="danger" @click="toggleCanResize({}, 3)">{{ props.addTableText }}</el-button>
    </template>
    <template #col-oprate="{ row }">
      <el-button size="small" type="primary" @click="toggleCanResize(row, 1)">设置排序</el-button>
      <ElPopconfirm title="Are you sure to delete this?" @confirm="handelDelete(row)">
        <template #reference>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </ElPopconfirm>
    </template>

    <template #col-recommendStatus="{ row }">
      <ElSwitch
        v-model="row.recommendStatus"
        class="ml-2"
        :active-value="1"
        :inactive-value="0"
        :before-change="() => switchChange(row)"
      />
    </template>
  </BasicTable>
  <BasicModal ref="modalRef" @ok="sureEditForm('edit')">
    <template v-if="clickType === 3">
      <BasicTable
        :columns="props.addColumn"
        showTableSetting
        :pagination="pagination2"
        :api="props.addTableApi"
        :columnSelectInit="{
          selectable: () => true,
          initSelectRows: []
        }"
        :rowSelection="{
          type: 'checkbox'
        }"
        useSearchForm
        @register="registerBrandTable"
      />
    </template>

    <BasicForm
      v-else
      @register="registerForm"
      :model="editRow"
      :schemas="formSchema"
      :showActionBtn="false"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref, reactive, unref, PropType } from 'vue';
import { ElPopconfirm, ElSwitch } from 'element-plus';
import { BasicTable, useTable } from '/@/components/Table';
import { BasicModal } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';

const props = defineProps({
  addTableText: {
    type: String,
    required: true
  },
  addColumn: {
    type: Array,
    required: true
  },
  addTableApi: {
    type: Function as PropType<(...arg: any) => Promise<any>>,
    required: true
  },

  baseSchema: {
    type: Array,
    required: true
  },
  baseColumn: {
    type: Function,
    required: true
  },
  baseApi: {
    type: Object as PropType<{
      list: (...arg: any) => Promise<any>;
      add: (...arg: any) => Promise<any>;
      update: (...arg: any) => Promise<any>;
      delete: (...arg: any) => Promise<any>;
    }>,
    required: true
  },
  searchSchema: {
    type: Array,
    required: true
  },
  addRecommendListBeafore: {
    type: Function,
    required: true
  }
});
// eslint-disable-next-line vue/no-setup-props-destructure
const { baseApi } = props;
const canResize = ref(false);
const modalRef = ref(false);

const editRow = ref({});
const loading = ref(false);
const clickType = ref(0);
const formSchema = ref([]);
formSchema.value = props.baseSchema;
const pagination = reactive({
  pageSize: 10,
  pageNum: 1
});
const pagination2 = reactive({
  pageSize: 10,
  pageNum: 1
});
let api = baseApi?.list;
function toggleCanResize(row, type) {
  clickType.value = type;

  editRow.value = row && row.id ? row : { status: 1 };
  unref(modalRef).visibleRef = true;
}

const [registerForm, formActions] = useForm();

let columns = props.baseColumn();

const [registerTable, { getForm, reload }] = useTable({
  api: api,
  columns,
  useSearchForm: true,
  formConfig: {
    schemas: props.searchSchema
  },
  showTableSetting: true,
  tableSetting: { fullScreen: true },
  showIndexColumn: false,
  rowKey: 'key',
  isTreeTable: true
});

const [registerBrandTable, { getSelectRows }] = useTable({
  useSearchForm: true,
  showIndexColumn: false,
  rowKey: 'id',
  isTreeTable: true
});
async function switchChange(row) {
  editRow.value = row;
  clickType.value = 2;
  unref(editRow).recommendStatus = unref(editRow).recommendStatus === 0 ? 1 : 0;
  return await sureEditForm();
}

let sureEditForm = async (type) => {
  if (unref(clickType) === 3) {
    let list = props.addRecommendListBeafore(getSelectRows());
    baseApi?.add(list).then((res) => {
      if (res.code === 200) {
        unref(modalRef).visibleRef = false;

        reload();
      }
    });
    return;
  }
  if (unref(editRow).id) {
    let item = type ? { ...formActions.getFieldsValue(), id: unref(editRow).id } : unref(editRow);

    await baseApi?.update(item).then((res) => {
      if (res) {
        unref(modalRef).visibleRef = false;
        reload();
        return true;
      }
    });
  } else {
    let item = formActions.getFieldsValue();

    baseApi?.add(item).then((res) => {
      if (res) {
        unref(modalRef).visibleRef = false;
        reload();
        return true;
      }
    });
  }
  return false;
};
function handelDelete(row) {
  baseApi?.delete({ id: row.id }).then((res) => {
    if (res.code === 200) {
      reload();
    }
  });
}

let data = [];
</script>
