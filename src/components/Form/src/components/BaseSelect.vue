<template>
  <ElSelect v-model="model[field]" placeholder=" " :disabled="disabled" @change="handleChange">
    <ElOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </ElSelect>
</template>

<script lang="ts" setup>
import { ElSelect, ElOption } from 'element-plus';
import type { PropType } from 'vue';
import { ref } from 'vue';
name: 'BaseSelect';
const emit = defineEmits(['update:modelValue', 'select-change']);
type set = {
  value: number | string;
  label: string;
};
let value = ref('');
const props = defineProps({
  options: { type: Array as PropType<set[]> },
  model: { type: Object },
  field: { type: String },
  disabled: { type: Boolean, default: false }
});

let handleChange = (e) => {
  emit('select-change', e);
};
</script>
