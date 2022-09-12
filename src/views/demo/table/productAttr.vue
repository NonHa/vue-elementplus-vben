<template>
  <BasicTable
    title="基础示例"
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
    @register="registerTable"
    @row-click="handleClick"
  >
    <template #form-advanceAfter>
      <el-button type="danger" @click="editBrand">新增</el-button>
    </template>

    <template #col-set="{ row, column }">
      <el-button size="small" @click="getProductAttrList(row, 0)">属性列表</el-button>
      <el-button size="small" @click="getProductAttrList(row, 1)">参数列表</el-button>
    </template>
    <template #col-oprate="{ row, column }">
      <el-button size="small" type="primary" @click="editBrand(row)">编辑</el-button>
      <ElPopconfirm title="Are you sure to delete this?" @confirm="handelDelete(row, column)">
        <template #reference>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </ElPopconfirm>
    </template>
  </BasicTable>

  <BasicModal ref="modalRef" @ok="sureEditForm" :height="500">
    <BasicForm
      v-if="editMOdelRenderType === 1"
      @register="registerForm"
      :model="editRow"
      :schemas="productAttributeFormSchemas"
      :showActionBtn="false"
    />

    <BasicTable
      v-else-if="editMOdelRenderType === 2"
      title="基础示例"
      titleHelpMessage="温馨提醒"
      :columns="columns"
      :dataSource="productAttrDate"
      :canResize="canResize"
      :loading="loading"
      showTableSetting
      useSearchForm
      height="300"
    >
      <template #form-advanceAfter>
        <el-button type="danger" @click="editProductAttr">新增</el-button>
      </template>

      <template #col-oprate="{ row, column }">
        <el-button size="small" type="primary" @click="editBrand(row)">编辑</el-button>
        <ElPopconfirm title="Are you sure to delete this?" @confirm="handelDelete(row, column)">
          <template #reference>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </ElPopconfirm>
      </template>
    </BasicTable>
  </BasicModal>

  <BasicModal ref="attrModalRef" @ok="sureEditForm" :height="500">
    <BasicForm
      @register="registerForm"
      :model="editAttrRow"
      :schemas="productAttributeFormSchemas"
      :showActionBtn="false"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive, watch, onMounted, unref, isRef } from 'vue';
import { ElPopconfirm } from 'element-plus';
import { BasicTable, useTable } from '/@/components/Table';
import { BasicModal } from '/@/components/Modal';

import {
  getProductAttrCateColumns,
  getProductAttrFormConfig,
  productAttributeFormSchemas
} from './tableData';
import {
  deleteProductAttributeById,
  getProductAttCateList,
  createProductAttribute,
  brandAdd,
  getProductAttList,
  productAttributeDelete,
  productAttributeAdd
} from '/@/api/sys/table';
import { BasicForm, useForm } from '/@/components/Form/index';

const canResize = ref(false);
const loading = ref(false);
const pagination = reactive({
  pageSize: 10,
  pageNum: 1
});
let api = getProductAttCateList;
let modalRef = ref();
let attrModalRef = ref();
let editMOdelRenderType = ref(1);

const editRow = ref<{
  id?: Number;
  showStatus?: Number;
  factoryStatus?: Number;
}>({});

const editAttrRow = ref<{
  id?: Number;
  productAttributeCategoryId: Number;
  type: Number;
}>({});
function editBrand(row) {
  editRow.value = row;
  editMOdelRenderType.value = 1;
  unref(modalRef).visibleRef = true;
}

let columns = getProductAttrCateColumns();
const [registerForm, formActions] = useForm();

const [registerTable, { getForm, reload }] = useTable({
  api: api,
  columns,
  useSearchForm: true,
  formConfig: { ...getProductAttrFormConfig() },
  showTableSetting: true,
  tableSetting: { fullScreen: true },
  showIndexColumn: false,
  rowKey: 'key',
  isTreeTable: true
});
function handelDelete(row) {
  if (unref(editMOdelRenderType) === 1) {
    deleteProductAttributeById(row.id).then((res) => {
      reload();
    });
  } else {
    productAttributeDelete({ id: row.id }).then((res) => {
      getProductAttrList(editRow, unref(attrType));
    });
  }
}
let data = [];

let sureEditForm = () => {
  if (unref(editMOdelRenderType) === 1) {
    createProductAttribute({
      ...formActions.getFieldsValue()
    }).then((res) => {
      if (res) {
        unref(modalRef).visibleRef = false;
        reload();
      }
    });
  } else {
    productAttributeAdd({
      ...formActions.getFieldsValue(),
      productAttributeCategoryId: unref(editRow).id,
      type: unref(attrType)
    }).then((res) => {
      if (res) {
        unref(attrModalRef).visibleRef = false;
        getProductAttrList(editRow, unref(attrType));
      }
    });
  }
};
const attrType = ref(0);
let productAttrDate = ref([]);
let getProductAttrList = (row, type) => {
  attrType.value = type;
  getProductAttList(unref(row).id, {
    page: 1,
    pageSize: 10,
    type: type
  }).then((res) => {
    if (res) {
      editMOdelRenderType.value = 2;

      productAttrDate.value = res.data.list;
      unref(modalRef).visibleRef = true;
    }
  });
};

const editProductAttr = (row) => {
  unref(attrModalRef).visibleRef = true;
};

const handleClick = (row) => {
  editRow.value = row;
};
</script>
