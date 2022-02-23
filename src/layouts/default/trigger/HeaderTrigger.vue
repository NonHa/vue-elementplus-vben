<!--
 * @Author: your name
 * @Date: 2022-01-25 15:51:57
 * @LastEditTime: 2022-02-22 11:03:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\layouts\default\trigger\HeaderTrigger.vue
-->
<template>
  <span :class="[prefixCls, theme]" @click="toggleCollapsed">
    <Expand v-if="getCollapsed" /> <Fold v-else />
  </span>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Expand, Fold } from '@element-plus/icons-vue';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { propTypes } from '/@/utils/propTypes';

  export default defineComponent({
    name: 'HeaderTrigger',
    components: { Expand, Fold },
    props: {
      theme: propTypes.oneOf(['light', 'dark']),
    },
    setup() {
      const { getCollapsed, toggleCollapsed } = useMenuSetting();
      const { prefixCls } = useDesign('layout-header-trigger');
      return { getCollapsed, toggleCollapsed, prefixCls };
    },
  });
</script>
