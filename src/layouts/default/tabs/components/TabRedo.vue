<!--
 * @Author: your name
 * @Date: 2022-02-22 17:03:11
 * @LastEditTime: 2022-02-22 17:10:17
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\layouts\default\tabs\components\TabRedo.vue
-->
<template>
  <span :class="`${prefixCls}__extra-redo`" @click="handleRedo">
    <RefreshRight :spin="loading" />
  </span>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { RefreshRight } from '@element-plus/icons-vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useTabs } from '/@/hooks/web/useTabs';

  export default defineComponent({
    name: 'TabRedo',
    components: { RefreshRight },

    setup() {
      const loading = ref(false);

      const { prefixCls } = useDesign('multiple-tabs-content');
      const { refreshPage } = useTabs();

      async function handleRedo() {
        loading.value = true;
        await refreshPage();
        setTimeout(() => {
          loading.value = false;
          // Animation execution time
        }, 1200);
      }
      return { prefixCls, handleRedo, loading };
    },
  });
</script>
