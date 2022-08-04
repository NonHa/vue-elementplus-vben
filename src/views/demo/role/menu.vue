<template>
  <el-tree
    ref="treeRef"
    :data="list"
    show-checkbox
    node-key="id"
    :props="defaultProps"
    default-expand-all
  />
</template>

<script lang="ts" setup>
import { menuTree } from '/@/api/sys/user';
import { ref, unref, computed, watch, nextTick, onMounted } from 'vue';
const { data } = await menuTree();
const defaultProps = {
  children: 'children',
  label: 'label'
};

const treeRef = ref();
const props = defineProps({
  menuAutoCheckKeys: {
    type: Array
  }
});

onMounted(() => {
  nextTick(() => {
    treeRef.value.setCheckedKeys(props.menuAutoCheckKeys);
  });
});

watch(
  () => props.menuAutoCheckKeys,
  () => {
    nextTick(() => {
      treeRef.value.setCheckedKeys(props.menuAutoCheckKeys);
    });
  }
);

const list = data.list.map((v) => {
  return {
    id: v.id,
    label: v.title,
    children: v.children.map((k) => {
      return {
        id: k.id,
        label: k.title
      };
    })
  };
});

const getCheckedKeys = (): Number[] => {
  return unref(treeRef).getCheckedKeys();
};
defineExpose({ getCheckedKeys });
</script>
