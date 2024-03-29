<template>
  <BasicTable
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
    :afterFetch="afterFetch"
    @register="registerTable"
    @row-click="handleClick"
    :beforeFetch="beforeFetch"
  >
    <template #form-advanceAfter>
      <el-button type="danger" @click="editBrand">新增</el-button>
    </template>
    <template #col-hidden="{ row, column }">
      <ElSwitch
        v-model="row.hidden"
        class="ml-2"
        :active-value="0"
        :inactive-value="1"
        :before-change="() => switchChange(row)"
      />
    </template>
    <template #col-set="{ row, column }">
      <el-button size="small" @click="getProductAttrList(row, 0)">查看下级</el-button>
    </template>
    <template #col-oprate="{ row, column }">
      <el-button size="small" type="primary" @click="editBrand(row)">编辑</el-button>
      <ElPopconfirm
        title="Are you sure to delete this?"
        @confirm="handelDelete({ ...row, hidden: 1 }, null)"
      >
        <template #reference>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </ElPopconfirm>
    </template>
  </BasicTable>

  <BasicModal ref="modalRef" @ok="sureEditForm(1)" :height="500">
    <BasicForm
      v-if="editMOdelRenderType === 1"
      @register="registerForm"
      :model="editRow"
      :schemas="productCateForm"
      :showActionBtn="false"
    />

    <BasicTable
      v-else-if="editMOdelRenderType === 2"
      :columns="columns"
      :dataSource="productAttrDate"
      :canResize="canResize"
      :loading="loading"
      showTableSetting
      :pagination="pagination"
      useSearchForm
      height="300"
      @row-click="handleClick2"
    >
      <template #col-hidden="{ row }">
        <ElSwitch
          v-model="row.hidden"
          class="ml-2"
          :active-value="0"
          :inactive-value="1"
          :before-change="() => switchChange(row)"
        />
      </template>
      <template #form-advanceAfter>
        <el-button type="danger" @click="editProductAttr">新增</el-button>
      </template>
      <template #col-oprate="{ row, column }">
        <el-button size="small" type="primary" @click="editBrand(row, true)">编辑</el-button>
        <ElPopconfirm
          title="Are you sure to delete this?"
          @confirm="handelDelete({ ...row, hidden: 1 }, null)"
        >
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
import { defineComponent, ref, reactive, watch, onMounted, unref, isRef } from 'vue';
import { ElPopconfirm } from 'element-plus';
import { BasicTable, useTable } from '/@/components/Table';
import { BasicModal } from '/@/components/Modal';

import { getMenuColumns, getProductAttrFormConfig, getEditMenuSchema } from './userData';
import { menuList, updateMenu, addMenu } from '/@/api/sys/user';
import { BasicForm, useForm } from '/@/components/Form/index';

const canResize = ref(false);
const loading = ref(false);

const border = ref(true);
const pagination = reactive({
  pageSize: 10,
  pageNum: 1
});
let api = menuList;
let modalRef = ref();
let attrModalRef = ref();
let editMOdelRenderType = ref(1);

const editRow = ref<{
  id?: Number;
}>({});

const editAttrRow = ref<{
  id?: Number;
}>({});
function editBrand(row, showChildrenModel) {
  if (row && row.id) {
    editRow.value = row;
  } else {
    editRow.value.hidden = 0;
    editRow.value.parentId = 0;
  }

  if (!showChildrenModel) {
    editMOdelRenderType.value = 1;
    unref(modalRef).visibleRef = true;
  } else {
    unref(attrModalRef).visibleRef = true;
  }
}

let beforeFetch = (params) => {
  let obj = params;
  obj.parentId = 0;
  obj.hidden = 0;
  return obj;
};
let productCateForm = ref([]);

const afterFetch = (data) => {
  productCateForm.value = getEditMenuSchema([
    { value: 0, label: ' 无上级分类' },
    ...data.map((v) => {
      return {
        value: v.id,
        label: v.title
      };
    })
  ]);
};
let columns = getMenuColumns();
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
async function handelDelete(row, model) {
  await updateMenu({
    ...row
  }).then((res) => {
    if (editMOdelRenderType.value === 2) {
      getProductAttrList(row);
    } else {
      reload();
    }
    model ? (model.visibleRef = false) : null;
    if (model) {
      return true;
    }
  });
  if (model) {
    return false;
  }
}

let data = [];

let sureEditForm = async (level) => {
  let data = formActions.getFieldsValue();
  const obj = level === 1 ? unref(editRow) : unref(editAttrRow);
  let model = level === 1 ? unref(modalRef) : unref(attrModalRef);
  data.productAttributeIdList = data.productAttributeIdList && [data.productAttributeIdList[1]];

  // return;
  if (!obj.id) {
    addMenu(data).then((res) => {
      if (res.code === 200) {
        model.visibleRef = false;
        reload();
      }
    });
  } else {
    await handelDelete(
      {
        ...data,
        id: obj.id
      },
      model
    );
  }
};
let productAttrDate = ref([]);
let getProductAttrList = (row, type) => {
  unref(editAttrRow).parentId = row.parentId === 0 ? row.id : row.parentId;
  menuList({
    page: 1,
    pageSize: 10,
    parentId: row.parentId === 0 ? row.id : row.parentId,
    hidden: 0
  }).then((res) => {
    if (res) {
      editMOdelRenderType.value = 2;
      productAttrDate.value = res.data.list;
      unref(modalRef).visibleRef = true;
    }
  });
};
async function switchChange(row) {
  return await handelDelete({ ...row, hidden: 1 }, null);
}
const editProductAttr = (row) => {
  unref(attrModalRef).visibleRef = true;
};

const handleClick = (row) => {
  editRow.value = row;
};
const handleClick2 = (row) => {
  editAttrRow.value = row;
};
</script>
