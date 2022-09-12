<template>
  <PageWrapper title="水印示例">
    <CollapseContainer class="w-full h-32 bg-white rounded-md" title="Global WaterMark">
      <ElButton type="primary" class="mr-2" @click="setWatermark('WaterMark Info')">
        Create
      </ElButton>
      <ElButton type="danger" class="mr-2" @click="clear"> Clear </ElButton>
      <ElButton type="warning" class="mr-2" @click="setWatermark('WaterMark Info New')">
        Reset
      </ElButton>
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { CollapseContainer } from '/@/components/Container/index';
  import { useWatermark } from '/@/hooks/web/useWatermark';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    components: { CollapseContainer, PageWrapper },
    setup() {
      const areaRef = ref<Nullable<HTMLElement>>(null);
      const { setWatermark, clear } = useWatermark();
      return {
        setWatermark,
        clear,
        areaRef,
      };
    },
  });
</script>
