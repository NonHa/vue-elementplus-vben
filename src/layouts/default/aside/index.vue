<!--
 * @Author: your name
 * @Date: 2022-01-25 15:52:50
 * @LastEditTime: 2022-02-17 16:14:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\layouts\default\aside\index.vue
-->
<template>
  <ElDrawer
    v-if="getIsMobile"
    :model-value="getIsMobile"
    direction="ltr"
    :modal-class="prefixCls"
    :show-close="false"
    size="auto"
    @close="handleClose"
  >
    <Sider />
  </ElDrawer>
  <MixSider v-else-if="getIsMixSidebar" />
  <Sider v-else />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import Sider from './LayoutSider.vue';
  import MixSider from './MixSider.vue';
  import { ElDrawer } from 'element-plus';
  import { useAppInject } from '/@/hooks/web/useAppInject';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  export default defineComponent({
    name: 'SiderWrapper',
    components: { Sider, MixSider, ElDrawer },
    setup() {
      const { prefixCls } = useDesign('layout-sider-wrapper');
      const { getIsMobile } = useAppInject();
      const { setMenuSetting, getCollapsed, getMenuWidth, getIsMixSidebar } = useMenuSetting();

      function handleClose() {
        setMenuSetting({
          collapsed: true,
        });
      }

      return { prefixCls, getIsMobile, getCollapsed, handleClose, getMenuWidth, getIsMixSidebar };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-sider-wrapper';

  .@{prefix-cls} {
    // .ant-drawer-body {
    //   height: 100vh;
    //   padding: 0;
    // }

    // .ant-drawer-header-no-title {
    //   display: none;
    // }
  }
</style>
