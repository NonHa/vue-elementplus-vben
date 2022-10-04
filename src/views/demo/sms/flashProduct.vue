<template>
  <el-button size="small" type="primary" @click="toggleCanResize">新增</el-button>

  <BasicTable
    :columns="columns"
    :dataSource="data"
    :canResize="canResize"
    :loading="loading"
    showTableSetting
    :api="api"
    :searchInfo="props.flashProductQuery"
    :afterFetch="afterFetch"
    @register="registerTable"
  >
    <template #col-oprate="{ row, column }">
      <el-button size="small" type="primary" @click="toggleCanResize(row, 2)">编辑</el-button>
      <ElPopconfirm title="Are you sure to delete this?" @confirm="handelDelete(row, column)">
        <template #reference>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </ElPopconfirm>
    </template>
  </BasicTable>
  <BasicModal ref="modalRef" @ok="sureEditForm('edit')">
    <BasicForm
      v-if="clickType === 2"
      @register="registerForm"
      :model="editRow"
      :schemas="getEditFlashProductSchema"
      :showActionBtn="false"
    />
    <BasicTable
      v-else
      :columns="getSetProductColumns()"
      :dataSource="productData"
      :canResize="canResize"
      :loading="loading"
      :pagination="pagination"
      :api="productApi"
      :rowSelection="{
        type: 'checkbox'
      }"
      :columnSelectInit="{
        selectable: selectableFun
      }"
      @register="registerProductTable"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, onMounted, unref, PropType } from 'vue';
import { ElPopconfirm, ElSwitch } from 'element-plus';
import { BasicTable, ColumnChangeParam, useTable } from '/@/components/Table';
import {
  getPromotionProductColumns,
  getFormConfig,
  getEditFlashProductSchema,
  getSetProductColumns
} from './promotionData';
import {
  flashProductRelationList,
  createFlashProductRelation,
  deleteFlashProductRelation,
  updateFlashProductRelation
} from '/@/api/sys/promotion';

import type { FlashProductRelation } from '/@/api/sys/promotion';
import { BasicModal } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { getTreeList } from '/@/api/sys/table';
import {FlashProductListItem} from './type'

const canResize = ref(false);
const modalRef = ref<{visibleRef:boolean}>({});

const editRow = ref<Partial<FlashProductListItem>>({});
const loading = ref(false);
const clickType = ref(0);
const productData = ref([]);
const pagination = reactive({
  pageSize: 10,
  pageNum: 1
});
const productApi = getTreeList;
const props = defineProps({
  flashProductQuery: {
    type: Object as PropType<{ promotionId: Number; sessionId: Number }>,
    required: true
  }
});


let api = flashProductRelationList;
const selectableFun = () => {};
watch(
  () => props.flashProductQuery,
  () => {
    reload();
  },
  {
    deep: true
  }
);
function toggleCanResize(row, type) {
  clickType.value = type;

  editRow.value = row && row.id ? row : { status: 1 };
  unref(modalRef).visibleRef = true;
}

const [registerForm, formActions] = useForm();

let columns = getPromotionProductColumns();

// const checkedKeys = ref<Array<string | number>>([]);

const [registerTable, { getForm, reload }] = useTable({
  api: api,
  columns,
  showTableSetting: true,
  tableSetting: { fullScreen: true },
  showIndexColumn: false,
  rowKey: 'key'
});
const [registerProductTable, { getSelectRows }] = useTable({
  api: productApi,
  columns,
  showTableSetting: true,
  tableSetting: { fullScreen: true },
  showIndexColumn: false,
  rowKey: 'key'
});
let sureEditForm = async (type) => {
  if (unref(clickType) === 2) {
    updateFlashProductRelation({ ...formActions.getFieldsValue(), id: unref(editRow).id }).then(
      (res) => {
        if (res) {
          unref(modalRef).visibleRef = false;
          reload();
          return true;
        }
      }
    );
  } else {
    let list: FlashProductRelation = getSelectRows().map((v) => {
      return {
        productId: v.id,
        flashPromotionId: props.flashProductQuery.promotionId,
        flashPromotionSessionId: props.flashProductQuery.sessionId
      };
    });
    createFlashProductRelation(list).then((res) => {
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

  deleteFlashProductRelation({ id: row.id }).then((res) => {
    if (res.code === 200) {
      reload();
    }
  });
}
const afterFetch = (data) => {
  return data.map((v) => {
    return {
      ...v,
      name: v.product.name,
      productSn: v.product.productSn,
      stock: v.product.stock,
      price: v.product.price
    };
  });
};

let data = [];
</script>
