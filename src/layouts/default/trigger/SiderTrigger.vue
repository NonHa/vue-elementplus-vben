<!--
 * @Author: your name
 * @Date: 2022-01-25 15:51:58
 * @LastEditTime: 2022-02-22 10:00:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\layouts\default\trigger\SiderTrigger.vue
-->
<template>
  <div @click.stop="toggleCollapsed">
    <Expand v-if="getCollapsed" />
    <Fold v-else />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Fold, Expand } from '@element-plus/icons-vue';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';

export default defineComponent({
  name: 'SiderTrigger',
  components: { Fold, Expand },
  setup() {
    const { getCollapsed, toggleCollapsed } = useMenuSetting();

    return { getCollapsed, toggleCollapsed };
  }
});
</script>
