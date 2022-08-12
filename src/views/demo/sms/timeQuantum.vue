<template>
  <BasicTable
    :columns="columns"
    :dataSource="data"
    :canResize="canResize"
    :loading="loading"
    @columns-change="handleColumnChange"
    @register="registerTable"
  >
    <template #form-advanceBefore>
      <el-button type="danger" @click="toggleCanResize">新增</el-button>
    </template>
    <template #col-operate="{ row, column }">
      <el-button v-if="getRowId" size="small" type="primary" @click="toggleCanResize(row, 1)">
        商品列表
      </el-button>
      <template v-else>
        <el-button size="small" type="primary" @click="toggleCanResize(row, 2)">编辑</el-button>
        <ElPopconfirm title="Are you sure to delete this?" @confirm="handelDelete(row, column)">
          <template #reference>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </ElPopconfirm>
      </template>
    </template>

    <template #col-status="{ row }">
      <ElSwitch
        v-show="!getRowId"
        v-model="row.status"
        class="ml-2"
        :active-value="1"
        :inactive-value="0"
        :before-change="() => switchChange(row)"
      />
      <div v-if="getRowId">
        {{ row.productCount }}
      </div>
    </template>
  </BasicTable>
  <BasicModal ref="modalRef" @ok="sureEditForm('edit')">
    <FlashProduct :flashProductQuery="flashProductQuery" />
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, onMounted, unref, computed, nextTick } from 'vue';
import { ElPopconfirm, ElSwitch } from 'element-plus';
import { BasicTable, ColumnChangeParam, useTable } from '/@/components/Table';
import { getTimeColumns, getTimeEditUserSchema } from './promotionData';
import {
  flashSessionList,
  updateFlashSession,
  addFlashSession,
  flashSessionSelectList
} from '/@/api/sys/promotion';
import { BasicModal } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { formatToDateTime } from '/@/utils/dateUtil';
import { BasicColumn } from '/@/components/Table/src/types/table';
import FlashProduct from './flashProduct.vue';
const canResize = ref(false);
const modalRef = ref(false);
const editRow = ref({});
const loading = ref(false);
const clickType = ref(0);
const formSchema = ref([]);
const api = ref();
const searchInfo = ref({});
const flashProductQuery = reactive<{
  promotionId: Number;
  sessionId: Number;
}>({
  promotionId: 0,
  sessionId: 0
});
let data = ref([]);
const columns = ref<BasicColumn[]>([]);
formSchema.value = getTimeEditUserSchema;

const props = defineProps({
  promotionRow: {
    type: Object
  }
});

watch(
  () => props?.promotionRow,
  (val) => {
    initApiGetList();
  },
  {
    deep: true
  }
);
const [registerTable, { getForm, reload, setColumns }] = useTable({
  columns: columns.value,
  showTableSetting: true,
  tableSetting: { fullScreen: true },
  showIndexColumn: false,
  rowKey: 'key',
  isTreeTable: true
});
const getRowId = computed(() => {
  return !!props?.promotionRow.id;
});
columns.value = getTimeColumns(getRowId.value);
const initApiGetList = async () => {
  flashProductQuery.promotionId = props?.promotionRow.id;
  if (props?.promotionRow.id) {
    api.value = flashSessionSelectList;
    searchInfo.value = {
      flashPromotionId: props?.promotionRow.id
    };
  } else {
    api.value = flashSessionList;
    searchInfo.value = {};
  }

  nextTick(() => {
    setColumns(getTimeColumns(getRowId.value));
  });

  const res = await api.value(searchInfo.value);
  data.value = res.data.list;
};
initApiGetList();
// let api = flashSessionList;
function toggleCanResize(row, type) {
  clickType.value = type;
  flashProductQuery.sessionId = row.id;
  editRow.value = row && row.id ? row : { status: 1 };
  unref(modalRef).visibleRef = true;
}

function handleColumnChange(data: ColumnChangeParam[]) {
  // console.log('ColumnChanged', data);
}
const [registerForm, formActions] = useForm();

// const checkedKeys = ref<Array<string | number>>([]);

async function switchChange(row) {
  editRow.value = row;
  clickType.value = 2;
  unref(editRow).status = unref(editRow).status === 0 ? 1 : 0;
  return await sureEditForm();
}

let sureEditForm = async (type) => {
  // if (unref(clickType) === 1) {
  //   updateUserRole({ adminId: unref(editRow).id, ...formActions.getFieldsValue() }).then((res) => {
  //     unref(modalRef).visibleRef = false;
  //     reload();
  //   });
  //   return;
  // }
  if (unref(editRow).id) {
    let item = type ? { ...formActions.getFieldsValue(), id: unref(editRow).id } : unref(editRow);
    item.startDate = formatToDateTime(item.startDate);
    item.endDate = formatToDateTime(item.endDate);
    await updateFlashSession(item).then((res) => {
      if (res) {
        unref(modalRef).visibleRef = false;
        reload();
        return true;
      }
    });
  } else {
    let item = formActions.getFieldsValue();

    addFlashSession(item).then((res) => {
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

defineExpose({ toggleCanResize });
</script>
