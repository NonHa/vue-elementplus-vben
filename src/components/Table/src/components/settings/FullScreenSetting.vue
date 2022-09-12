<template>
  <ElTooltip placement="top">
    <template #title>
      <span>{{ 'component.table.settingFullScreen' }}</span>
    </template>
    <FullScreen @click="toggle" v-if="!isFullscreen" />
    <Icon v-else @click="toggle" icon="fluent:full-screen-minimize-16-filled" />

    <!-- <FullscreenExitOutlined @click="toggle" v-else /> -->
  </ElTooltip>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { ElTooltip } from 'element-plus';
  import { FullScreen } from '@element-plus/icons-vue';
  import { useFullscreen } from '@vueuse/core';
  // import { useI18n } from '/@/hooks/web/useI18n';
  import { useTableContext } from '../../hooks/useTableContext';
  import Icon from '/@/components/Icon';

  export default defineComponent({
    name: 'FullScreenSetting',
    components: {
      FullScreen,
      ElTooltip,
      Icon,
    },

    setup() {
      const table = useTableContext();
      // const { t } = useI18n();
      const { toggle, isFullscreen } = useFullscreen(table.wrapRef);

      return {
        toggle,
        isFullscreen,
        t,
      };
    },
  });
</script>
