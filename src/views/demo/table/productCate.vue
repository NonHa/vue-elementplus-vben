<template>
  <BasicTable
    title="基础示例"
    titleHelpMessage="温馨提醒"
    :columns="columns"
    :dataSource="data"
    :canResize="canResize"
    :loading="loading"
    :bordered="border"
    showTableSetting
    :pagination="pagination"
    :tableSearchQuery="{ pageNum: 1, pageSize: 50 }"
    :api="api"
    useSearchForm
    @register="registerTable"
    @row-click="handleClick"
    :beforeFetch="beforeFetch"
    :afterFetch="afterFetch"
  >
    <template #form-advanceAfter>
      <el-button type="danger" @click="editBrand">新增</el-button>
    </template>

    <template #col-set="{ row }">
      <el-button size="small" @click="getProductAttrList(row)">查看下级</el-button>
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

  <BasicModal ref="modalRef" @ok="sureEditForm(1)" :height="500">
    <BasicForm
      v-if="editModelRenderType === 1"
      @register="registerForm"
      :model="editRow"
      :schemas="productCateForm"
      :showActionBtn="false"
    />

    <BasicTable
      v-else-if="editModelRenderType === 2"
      title="基础示例"
      titleHelpMessage="温馨提醒"
      :columns="columns"
      :dataSource="productAttrDate"
      :canResize="canResize"
      :loading="loading"
      showTableSetting
      useSearchForm
      height="300"
      @row-click="handleClick2"
    >
      <template #form-advanceAfter>
        <el-button type="danger" @click="editProductAttr">新增</el-button>
      </template>
      <template #col-oprate="{ row, column }">
        <el-button size="small" type="primary" @click="editBrand(row, true)">编辑</el-button>
        <ElPopconfirm title="Are you sure to delete this?" @confirm="handelDelete(row, column)">
          <template #reference>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </ElPopconfirm>
      </template>
    </BasicTable>
  </BasicModal>

  <BasicModal ref="attrModalRef" @ok="sureEditForm(2)" :height="500">
    <BasicForm
      @register="registerForm"
      :model="editAttrRow"
      :schemas="productCateForm"
      :showActionBtn="false"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, onMounted, unref, isRef, computed } from 'vue';
import { ElPopconfirm } from 'element-plus';
import { BasicTable, useTable } from '/@/components/Table';
import { BasicModal } from '/@/components/Modal';

import {
  getProductCateColumns,
  getProductAttrFormConfig,
  productCateFormSchemas
} from './tableData';
import {
  deleteproductCategoryById,
  getproductCategoryList,
  createproductCategory,
  updateproductCategory,
  getAttrList
} from '/@/api/sys/table';
import { BasicForm, useForm } from '/@/components/Form/index';
import { FormSchema } from '/@/components/Form/src/types/form';

const canResize = ref(false);
const loading = ref(false);

const border = ref(true);
const pagination = reactive({
  pageSize: 10,
  pageNum: 1
});
let api = getproductCategoryList;
let modalRef = ref();
let attrModalRef = ref();
let editModelRenderType = ref(1);

const editRow = ref<{
  id?: Number;
}>({});

const editAttrRow = ref<{
  id?: Number;
  parentId?: Number;
}>({});
function editBrand(row, showChildrenModel) {
  if (!showChildrenModel) {
    editRow.value = row;
    editModelRenderType.value = 1;
    unref(modalRef).visibleRef = true;
  } else {
    unref(attrModalRef).visibleRef = true;
  }
}

let beforeFetch = (params) => {
  let obj = params;
  obj.parentId = 0;
  return obj;
};
let columns = getProductCateColumns();
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
const reloadTable = computed(() => {
  return unref(editModelRenderType) === 2 && unref(modalRef).visibleRef;
});

const reloadFun = () => {
  if (reloadTable.value) {
    getProductAttrList(unref(editRow));
  } else {
    reload();
  }
};
function handelDelete(row) {
  deleteproductCategoryById(row.id).then((res) => {
    reloadFun();
  });
}

let data = [];
let productCateForm = ref<FormSchema[]>([]);
const afterFetch = async (data) => {
  await getAttrList().then((res) => {
    let { data: list } = res;

    productCateForm.value = productCateFormSchemas(
      [
        { field: 0, title: ' 无上级分类' },
        ...data.map((v) => {
          return {
            field: v.id,
            title: v.name
          };
        })
      ],
      list.list.map((v) => {
        return {
          field: v.id,
          title: v.name,
          children: v.productAttributeList.map((k) => {
            return {
              field: k.id,
              title: k.name
            };
          })
        };
      })
    );
  });
};

let sureEditForm = (level) => {
  let data = formActions.getFieldsValue();
  const obj = level === 1 ? unref(editRow) : unref(editAttrRow);
  let model = level === 1 ? unref(modalRef) : unref(attrModalRef);
  data.productAttributeIdList = data.productAttributeIdList && [data.productAttributeIdList[1]];
  if (!obj.id) {
    createproductCategory({
      ...data
    }).then((res) => {
      if (res) {
        model.visibleRef = false;
        reloadFun();
      }
    });
  } else {
    updateproductCategory({
      ...data,
      id: obj.id
    }).then((res) => {
      if (res) {
        model.visibleRef = false;
        reloadFun();
      }
    });
  }
};

let productAttrDate = ref([]);
let getProductAttrList = (row) => {
  editRow.value = row;
  unref(editAttrRow).parentId = row.id;
  getproductCategoryList({
    page: 1,
    pageSize: 10,
    parentId: row.id
  }).then((res) => {
    if (res) {
      editModelRenderType.value = 2;
      productAttrDate.value = res.data.list;
      unref(modalRef).visibleRef = true;
    }
  });
};

const editProductAttr = (row) => {
  editAttrRow.value = { parentId: unref(editRow).id };
  unref(attrModalRef).visibleRef = true;
};

const handleClick = (row) => {
  editRow.value = row;
};
const handleClick2 = (row) => {
  editAttrRow.value = row;
};
</script>
