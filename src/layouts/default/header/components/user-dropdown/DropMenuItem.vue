<!--
 * @Author: your name
 * @Date: 2022-02-25 10:24:57
 * @LastEditTime: 2022-03-04 09:46:53
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\layouts\default\header\components\user-dropdown\DropMenuItem.vue
-->
<template>
  <ElDropdownItem :divided="divided" :key="itemKey">
    <span class="flex items-center">
      <Icon :icon="icon" class="mr-1" />
      <span>{{ text }}</span>
    </span>
  </ElDropdownItem>
</template>
<script lang="ts">
  import { ElDropdownItem } from 'element-plus';

  import { computed, defineComponent, getCurrentInstance } from 'vue';

  import Icon from '/@/components/Icon/index';
  import { propTypes } from '/@/utils/propTypes';

  export default defineComponent({
    name: 'DropdownMenuItem',
    components: { ElDropdownItem, Icon },
    props: {
      key: propTypes.string,
      text: propTypes.string,
      icon: propTypes.string,
      divided: propTypes.bool,
    },
    setup(props) {
      const instance = getCurrentInstance();
      const itemKey = computed(() => props.key || instance?.vnode?.props?.key);
      return { itemKey };
    },
  });
</script>

<style lang="less" scoped>
  .mr-1 {
    margin-right: 1px;
  }
</style>
