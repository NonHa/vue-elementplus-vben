<template>
  <ElTooltip :title="getTitle" placement="bottom" :mouseEnterDelay="0.5">
    <span @click="toggle">
      <Expand v-if="!isFullscreen" />
      <Fold v-else />
    </span>
  </ElTooltip>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';
  import { useFullscreen } from '@vueuse/core';

  import { Expand, Fold } from '@element-plus/icons-vue';

  export default defineComponent({
    name: 'FullScreen',
    components: { Fold, Expand },

    setup() {
      const { toggle, isFullscreen } = useFullscreen();

      const getTitle = computed(() => {
        return unref(isFullscreen) ? 234 : 234;
      });

      return {
        getTitle,
        isFullscreen,
        toggle,
      };
    },
  });
</script>
