/* * @Author: your name * @Date: 2022-03-01 14:50:19 * @LastEditTime: 2022-03-04 16:26:31 *
@LastEditors: Please set LastEditors * @Description: 打开koroFileHeader查看配置 进行设置:
https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE * @FilePath:
\ym-Vue3\src\components\Modal\src\components\Modal.tsx */
<template>
  <ElDialog v-model="show" @close="closeDialog">
    <slot name="title"></slot>
    <slot></slot>
    <!-- <slot name="closeIcon"></slot> -->
    <slot name="footer"></slot>
  </ElDialog>
</template>

<script lang="ts">
  import { ElDialog } from 'element-plus';
  import { defineComponent, toRefs, unref, h, watch, ref } from 'vue';
  import { basicProps } from '../props';
  import { useModalDragMove } from '../hooks/useModalDrag';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  import { extendSlots } from '/@/utils/helper/tsxHelper';

  export default defineComponent({
    name: 'Modal',
    inheritAttrs: false,
    props: basicProps,
    components: { ElDialog },

    emits: ['cancel', 'update:visible'],
    setup(props, { slots, emit }) {
      const { visible, draggable, destroyOnClose } = toRefs(props);
      const attrs = useAttrs();
      let show = ref(false);
      useModalDragMove({
        visible,
        destroyOnClose,
        draggable,
      });
      watch(
        () => props.visible,
        (val) => {
          show.value = val;
        }
      );

      const closeDialog = () => {
        emit('update:visible', false);
      };

      const propsData = { ...unref(attrs), ...props } as Recordable;
      return {
        show,
        props,

        closeDialog,
      };
    },
  });
</script>
