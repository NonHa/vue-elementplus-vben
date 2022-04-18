<template>
  <ElTableColumn
    v-for="(column, index) in columns"
    :key="index"
    :prop="column.prop"
    :label="column.label"
  >
  </ElTableColumn>
</template>

<script lang="ts" setup>
  import { ElTableColumn } from 'element-plus';
  import { columnProps } from './columnProps';
  const props = defineProps(columnProps);
  console.log('columns', props.columns);
</script>
