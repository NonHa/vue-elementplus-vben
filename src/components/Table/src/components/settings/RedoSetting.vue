<template>
  <ElTooltip placement="top">
    <template #title>
      <span>{{ 'common.redo' }}</span>
    </template>
    <Refrigerator @click="redo" />
  </ElTooltip>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { ElTooltip } from 'element-plus';
  import { Refrigerator } from '@element-plus/icons-vue'; //RedoOutlined
  // import { useI18n } from '/@/hooks/web/useI18n';
  import { useTableContext } from '../../hooks/useTableContext';

  export default defineComponent({
    name: 'RedoSetting',
    components: {
      Refrigerator,
      ElTooltip,
    },
    setup() {
      const table = useTableContext();
      // const { t } = useI18n();

      function redo() {
        table.reload();
      }

      return { redo };
    },
  });
</script>
