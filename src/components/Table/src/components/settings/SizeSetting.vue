<template>
  <ElTooltip placement="top">
    <template #title>
      <span>{{ 'component.table.settingDens' }}</span>
    </template>

    <ElDropdown placement="bottom" :trigger="['click']" :getPopupContainer="getPopupContainer">
      <Collection />
      <template #overlay>
        <ElMenu @open="handleTitleClick" selectable v-model:selectedKeys="selectedKeysRef">
          <ElMenuItem key="default">
            <span>{{ 'component.table.settingDensDefault' }}</span>
          </ElMenuItem>
          <ElMenuItem key="middle">
            <span>{{ 'component.table.settingDensMiddle' }}</span>
          </ElMenuItem>
          <ElMenuItem key="small">
            <span>{{ 'component.table.settingDensSmall' }}</span>
          </ElMenuItem>
        </ElMenu>
      </template>
    </ElDropdown>
  </ElTooltip>
</template>
<script lang="ts">
  import type { SizeType } from '../../types/table';
  import { defineComponent, ref } from 'vue';
  import { ElTooltip, ElDropdown, ElMenu, ElMenuItem } from 'element-plus';
  import { Collection } from '@element-plus/icons-vue';
  // import { useI18n } from '/@/hooks/web/useI18n';
  import { useTableContext } from '../../hooks/useTableContext';
  import { getPopupContainer } from '/@/utils';

  export default defineComponent({
    name: 'SizeSetting',
    components: {
      Collection,
      ElTooltip,
      ElDropdown,
      ElMenu,
      ElMenuItem,
    },
    setup() {
      const table = useTableContext();
      // const { t } = useI18n();

      const selectedKeysRef = ref<SizeType[]>([table.getSize()]);

      function handleTitleClick(index: SizeType) {
        selectedKeysRef.value = [index];
        table.setProps({
          size: index,
        });
      }

      return {
        handleTitleClick,
        selectedKeysRef,
        getPopupContainer,
        // t,
      };
    },
  });
</script>
