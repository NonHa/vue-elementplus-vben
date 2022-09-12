<template>
  <ElButton @click="btnClick">click</ElButton>
  <ElButton @click="btnClick2">click2</ElButton>
  <ElInput v-model="form.phone" />
  <ElInput v-model="form.authCode" />
  <!-- <el-table v-bind="data" style="width: 100%">
    <el-table-column fixed prop="date" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="state" label="State" width="120" />
    <el-table-column prop="city" label="City" width="120" />
    <el-table-column prop="address" label="Address" width="600" />
    <el-table-column prop="zip" label="Zip" width="120" />
  </el-table> -->

  <!-- <Pagination
    :total="total"
    v-model:page="pagiantion.current"
    v-model:limit="pagiantion.pageSize"
    @pagination-change="btnClick"
  /> -->
</template>

<script lang="ts" setup>
import { defineComponent, ref, reactive, unref, watch, onMounted, computed } from 'vue';
import { ElButton, ElTable, ElInput } from 'element-plus';
import { getBrand } from '/@/api/sys/test';
import { getTreeList, getAuthCode, verifyAuthCode } from '/@/api/sys/table';
import { Pagination } from '/@/components/Pagination';

let tableData = ref([]);
let form = ref({
  phone: '',
  authCode: ''
});
let pagiantion = reactive({
  current: 1,
  pageSize: 5
});
let total = ref(0);
const btnClick = () => {
  // getTreeList({ page: pagiantion.current, pageSize: pagiantion.pageSize }).then((res) => {
  //   tableData.value = res.list;
  //   total.value = res.total;
  // });

  getAuthCode({ telephone: unref(form).phone }).then((res) => {
    // console.log(res);
    unref(form).authCode = res;
  });
};
const btnClick2 = () => {
  // getTreeList({ page: pagiantion.current, pageSize: pagiantion.pageSize }).then((res) => {
  //   tableData.value = res.list;
  //   total.value = res.total;
  // });

  verifyAuthCode({ telephone: unref(form).phone, authCode: unref(form).authCode }).then(
    (res) => {}
  );
};
const data = computed(() => {
  let prop = {
    data: unref(tableData)
  };
  return prop;
});
</script>
