<template>
  <ElTableColumn
    v-for="(columnItem, index) in columns"
    :key="index"
    :prop="columnItem.prop"
    :label="columnItem.prop"
  >
    <template #default="{ row, column }">
      <ColumnContent :row="row" :column="columnItem" :field="column.property" @onInput="setCol">
        <template #[item]="data" v-for="item in Object.keys(slots)">
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
      </ColumnContent>
    </template>
  </ElTableColumn>
</template>

<script lang="ts" setup>
  import { ElTableColumn } from 'element-plus';
  import { columnProps } from './columnProps';
  import ColumnContent from './baseColumnContent/content.vue';
  import { useSlots, useAttrs } from 'vue';
  const props = defineProps(columnProps);
  function setCol(row) {}
  let slots = useSlots();
  // console.log('columns', Object.keys(slots));
</script>
