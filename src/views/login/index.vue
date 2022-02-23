<!--
 * @Author: your name
 * @Date: 2022-01-05 15:44:46
 * @LastEditTime: 2022-01-07 17:38:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\views\login\index.vue
-->
<template>
  <el-form
    ref="loginForm_input"
    :model="loginForm"
    class="login-form"
    autocomplete="on"
    label-position="left"
    size="small"
  >
    <div class="title-container">
      <h3 class="title">伊百丽经营管理系统</h3>
    </div>
    <el-form-item prop="userName">
      <el-input ref="userName_input" v-model="loginForm.userName" placeholder="请输入用户名" />
    </el-form-item>

    <el-form-item prop="password">
      <el-input ref="password_input" v-model="loginForm.password" placeholder="请输入密码" />
      <span class="show-pwd">
        <!-- <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /> -->
      </span>
    </el-form-item>

    <el-form-item style="height: 30px; border: none">
      <label
        for="rememberMe"
        title="下次不需要再登录"
        style="color: #6f6f6f; font-weight: normal; float: left"
      >
        <input
          type="checkbox"
          style="height: 16px; width: 16px"
          id="rememberMe"
          name="rememberMe"
        />
        记住密码
      </label>
      <label
        for="autoLogin"
        title="自动登录"
        style="color: #6f6f6f; font-weight: normal; float: right"
      >
        <input
          type="checkbox"
          style="height: 16px; width: 16px; margin-left: 20px"
          id="autoLogin"
          name="autoLogin"
        />
        自动登录
      </label>
    </el-form-item>
    <el-button class="login-btn" size="medium" type="primary">登录</el-button>
  </el-form>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';

  const loginForm = reactive({
    password: '',
    userName: '',
  });
</script>
<style scoped lang="less"></style>
