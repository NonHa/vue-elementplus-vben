<!--
 * @Author: your name
 * @Date: 2022-02-25 10:24:57
 * @LastEditTime: 2022-03-04 09:46:53
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\layouts\default\header\components\user-dropdown\DropMenuItem.vue
-->
<template>
  <ElMenuItem :key="itemKey">
    <span class="flex items-center">
      <Icon :icon="icon" class="mr-1" />
      <span>{{ text }}</span>
    </span>
  </ElMenuItem>
</template>
<script lang="ts">
import { ElMenuItem } from "element-plus";

import { computed, defineComponent, getCurrentInstance } from "vue";

import Icon from "/@/components/Icon/index";
import { propTypes } from "/@/utils/propTypes";

export default defineComponent({
  name: "DropdownMenuItem",
  components: { ElMenuItem, Icon },
  props: {
    key: propTypes.string,
    text: propTypes.string,
    icon: propTypes.string,
  },
  setup(props) {
    const instance = getCurrentInstance();
    const itemKey = computed(() => props.key || instance?.vnode?.props?.key);
    return { itemKey };
  },
});
</script>
