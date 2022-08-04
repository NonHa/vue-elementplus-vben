<template>
  <el-descriptions direction="vertical" :column="1" border>
    <el-descriptions-item v-for="(item, index) in list" :key="index">
      <el-checkbox
        v-for="(item2, index2) in item.children"
        v-model="checkKeys[item2.id]"
        :label="item2.name"
        size="large"
        :key="index2"
      />
      <template #label>
        <el-checkbox
          v-model="checkMainKeys[item.id]"
          :label="item.name"
          size="large"
          @change="(e) => checkChange(e, item.id)"
        />
      </template>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { resourceCategoryTree } from '/@/api/sys/user';
import { ref, unref, computed, watch, nextTick, onMounted, reactive } from 'vue';
import { fa } from 'element-plus/es/locale';
const { data } = await resourceCategoryTree();

const checkMainKeys = ref({});
let checkKeys = ref({});

const props = defineProps({
  menuAutoCheckKeys: {
    type: Array
  }
});

onMounted(() => {
  nextTick(() => {
    setCheckInit();
  });
});
watch(
  () => props.menuAutoCheckKeys,
  () => {
    setCheckInit();
  }
);
const list = data.list.map((v) => {
  return {
    ...v,
    childrenIds: v.children.map((k) => k.id)
  };
});

const setCheckInit = () => {
  nextTick(() => {
    checkKeys.value = {};
    checkMainKeys.value = {};

    list.forEach((v) => {
      let set = new Set([...props.menuAutoCheckKeys, ...v.childrenIds]);

      checkMainKeys.value[v.id] = [...set].length === props.menuAutoCheckKeys.length;
    });
    props.menuAutoCheckKeys.forEach((v) => {
      checkKeys.value[v] = true;
    });
  });
};

const checkChange = (val, id) => {
  let index = list.findIndex((v) => v.id === id);
  let children = list[index].children;
  children.forEach((v) => {
    checkKeys.value[v.id] = val;
  });
};
const getCheckedKeys = () => {
  return Object.keys(checkKeys.value);
};
defineExpose({ getCheckedKeys });
</script>
