<template>
  <span :class="`${prefixCls}- flex items-center `">
    <Icon v-if="getIcon" :icon="getIcon" :size="18" :class="`${prefixCls}-wrapper__icon mr-2`" />
    name
  </span>
</template>
<script setup lang="ts">
  import { computed } from 'vue';

  import Icon from '/@/components/Icon/index';

  import { useDesign } from '/@/hooks/web/useDesign';
  import { contentProps } from '../props';
  const name = '1212';
  const props = defineProps(contentProps);

  const { prefixCls } = useDesign('basic-menu-item-content');

  const getIcon = computed(() => props.item?.icon);
</script>
