<template>
  <ElPagination
    v-bind="innerPropsRef"
    :total="total"
    v-model:currentPage="currentPage"
    v-model:page-size="currentSize"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts">
import { ElPagination } from 'element-plus';
import { defineComponent, computed, unref } from 'vue';
import { PaginationProps } from './props';

export default defineComponent({
  name: 'Pagination',
  components: {
    ElPagination
  },
  props: PaginationProps,
  emits: ['pagination-change', 'update:limit', 'update:page'],
  setup(props, { emit }) {
    let innerPropsRef = { ...props };

    let total = computed(() => {
      return unref(props).total;
    });

    let currentPage = computed({
      get: () => props.page,
      set: (val) => {
        emit('update:page', val);
      }
    });
    let currentSize = computed({
      get: () => props.limit,
      set: (val) => {
        emit('update:limit', val);
      }
    });
    const handleCurrentChange = (current) => {
      emit('pagination-change', { current: current, pageSize: currentSize });
    };
    const handleSizeChange = (size) => {
      console.log('size', size);

      emit('pagination-change', { current: currentPage, pageSize: size });
    };
    return {
      innerPropsRef,
      currentPage,
      currentSize,
      handleCurrentChange,
      handleSizeChange,
      total
    };
  }
});
</script>
