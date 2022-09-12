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
    :columnSelectInit="{
      selectable: selectableFun,
      initSelectRows: [1, 2, 3]
    }"
    :rowSelection="{
      type: 'checkbox'
    }"
    @register="registerTable"
    @row-click="handleClick"
  >
    <template #form-advanceAfter>
      <!-- <input type="file" id="file-uploader" @change="onChange" multiple /> -->

      <el-button type="danger" @click="editBrand">新增</el-button>
    </template>

    <template #col-oprate="{ row, column }">
      <el-button size="small" type="primary" @click="editBrand(row)">编辑</el-button>
      <ElPopconfirm title="Are you sure to delete this?" @confirm="handelDelete(row, column)">
        <template #reference>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </ElPopconfirm>
    </template>
    <template #col-factoryStatus="{ row, column }">
      <ElSwitch
        v-model="row.factoryStatus"
        class="ml-2"
        :active-value="1"
        :inactive-value="0"
        :before-change="() => switchChange(row, 'factoryStatus')"
      />
    </template>
    <template #col-showStatus="{ row, column }">
      <ElSwitch
        v-model="row.showStatus"
        class="ml-2"
        :active-value="1"
        :inactive-value="0"
        :before-change="() => switchChange(row, 'showStatus')"
      />
    </template>
    <template #col-productCommentCount="{ row, column }">
      商品：{{ row.productCommentCount }} 评价：{{ row.sort }}
    </template>
  </BasicTable>

  <BasicModal ref="modalRef" @ok="sureEditForm">
    <BasicForm
      @register="registerForm"
      :model="editRow"
      :schemas="brandModalBrandSchemas"
      :showActionBtn="false"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive, watch, onMounted, unref, isRef } from 'vue';
import { ElPopconfirm, ElSwitch } from 'element-plus';
import { BasicTable, useTable } from '/@/components/Table';
import { BasicModal } from '/@/components/Modal';

import { getBrandColumns, getBrandFormConfig, brandModalBrandSchemas } from './tableData';
import { brandDelete, brandList, brandUpdate, brandAdd } from '/@/api/sys/table';
import { BasicForm, useForm } from '/@/components/Form/index';

const canResize = ref(false);
const loading = ref(false);
const pagination = reactive({
  pageSize: 10,
  pageNum: 1
});
let api = brandList;
let modalRef = ref();

const editRow = ref<{
  id?: Number;
  showStatus?: Number;
  factoryStatus?: Number;
}>({});
function editBrand(row) {
  editRow.value = row;

  unref(modalRef).visibleRef = true;
}

let columns = getBrandColumns();
const [registerForm, formActions] = useForm();

const [registerTable, { getForm, reload }] = useTable({
  api: api,
  columns,
  useSearchForm: true,
  formConfig: { ...getBrandFormConfig() },
  showTableSetting: true,
  tableSetting: { fullScreen: true },
  showIndexColumn: false,
  rowKey: 'key',
  isTreeTable: true
});

function selectableFun(row, index) {
  return true;
}

function handelDelete(row) {
  brandDelete(row.id).then((res) => {
    reload();
  });
}
let data = [];

let sureEditForm = async () => {
  if (unref(editRow).id) {
    await brandUpdate(unref(editRow).id, {
      name: unref(editRow).name,
      factoryStatus: unref(editRow).factoryStatus,
      showStatus: unref(editRow).showStatus,
      ...formActions.getFieldsValue()
    }).then((res) => {
      if (res) {
        unref(modalRef).visibleRef = false;

        reload();
        return true;
      }
    });
  } else {
    brandAdd({
      ...formActions.getFieldsValue()
    }).then((res) => {
      if (res) {
        unref(modalRef).visibleRef = false;
        reload();
      }
    });
  }
  return false;
};
const handleClick = (row) => {
  editRow.value = row;
};
const switchChange = async (row, filed) => {
  editRow.value = row;
  unref(editRow)[filed] = unref(editRow)[filed] === 0 ? 1 : 0;
  return await sureEditForm();
};
</script>
