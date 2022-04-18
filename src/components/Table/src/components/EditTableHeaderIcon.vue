<template>
  <span>
    <slot></slot>
    {{ title }}
    <FolderRemove />
  </span>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { FolderRemove } from '@element-plus/icons-vue';
  export default defineComponent({
    name: 'EditTableHeaderIcon',
    components: { FolderRemove },
    props: { title: { type: String, default: '' } },
  });
</script>
