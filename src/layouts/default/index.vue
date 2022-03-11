<!--
 * @Author: your name
 * @Date: 2022-01-04 15:18:29
 * @LastEditTime: 2022-02-24 15:46:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\layouts\default\index.vue
-->
<template>
  <ElContainer>
    <Aside></Aside>
    <ElContainer>
      <LayoutMultipleHeader></LayoutMultipleHeader>
      <!-- <el-main>Main</el-main> -->
      <ElSelectV2
        style="margin-top: 250px"
        v-model="value"
        :options="options"
        placeholder="Please select"
        size="large"
      ></ElSelectV2>
    </ElContainer>
  </ElContainer>
</template>

<script lang="ts" setup>
import Aside from "./aside/index.vue";
// import Header from './header/index.vue';
import LayoutMultipleHeader from "./header/MultipleHeader.vue";
import { ElContainer, ElSelectV2 } from "element-plus";

import { ref } from "vue";
const initials = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

const value = ref("");
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}));
</script>

<style lang="less" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}
</style>
