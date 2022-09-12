<!--
 * @Author: your name
 * @Date: 2022-01-04 15:18:29
 * @LastEditTime: 2022-02-24 15:46:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\layouts\default\index.vue
-->
<template>
  <ElContainer :class="prefixCls">
    <LayoutHeader v-if="getShowFullHeaderRef" />
    <ElContainer>
      <Aside v-if="getShowSidebar" />
      <ElContainer :class="`${prefixCls}-main`">
        <LayoutMultipleHeader />
        <LayoutContent />
      </ElContainer>

      <!-- <el-main>Main</el-main> -->
      <el-select-v2
        style="margin-top: 150px"
        v-model="value"
        :options="options"
        placeholder="Please select"
        size="large"
      />
    </ElContainer>
  </ElContainer>
</template>

<script lang="ts" setup>
import { unref, computed } from 'vue';
import Aside from './aside/index.vue';
// import Header from './header/index.vue';
import LayoutMultipleHeader from './header/MultipleHeader.vue';
import LayoutContent from './content/index.vue';

import { ElContainer, ElMain } from 'element-plus';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import LayoutHeader from './header/index.vue';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
// import { useAppInject } from '/@/hooks/web/useAppInject';
import { useDesign } from '/@/hooks/web/useDesign';
const { prefixCls } = useDesign('default-layout');

const { getShowFullHeaderRef } = useHeaderSetting();
console.log('getShowFullHeaderRef', getShowFullHeaderRef.value);

// const { getIsMobile } = useAppInject();

const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting();

const layoutClass = computed(() => {
  let cls: string[] = ['ant-layout'];
  if (unref(getIsMixSidebar) || unref(getShowMenu)) {
    cls.push('ant-layout-has-sider');
  }
  return cls;
});
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-default-layout';

.@{prefix-cls} {
  display: flex;
  width: 100%;
  min-height: 100%;
  background-color: @content-bg;
  flex-direction: column;

  > .ant-layout {
    min-height: 100%;
  }

  &-main {
    width: 100%;
    margin-left: 1px;
    flex-direction: column;
  }
}
</style>
