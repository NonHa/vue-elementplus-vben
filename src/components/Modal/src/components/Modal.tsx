/*
 * @Author: your name
 * @Date: 2022-03-01 14:50:19
 * @LastEditTime: 2022-03-04 16:26:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\components\Modal\src\components\Modal.tsx
 */
import { ElDialog } from 'element-plus';
import { defineComponent, toRefs, unref, h } from 'vue';
import { basicProps } from '../props';
import { useModalDragMove } from '../hooks/useModalDrag';
import { useAttrs } from '/@/hooks/core/useAttrs';
import { extendSlots } from '/@/utils/helper/tsxHelper';

export default defineComponent({
  name: 'Modal',
  inheritAttrs: false,
  props: basicProps,
  emits: ['cancel'],
  setup(props, { slots }) {
    const { visible, draggable, destroyOnClose } = toRefs(props);
    const attrs = useAttrs();
    useModalDragMove({
      visible,
      destroyOnClose,
      draggable,
    });

    console.log('slots', extendSlots(slots));
    let dialogVisible = false;
    return () => {
      const propsData = { ...unref(attrs), ...props } as Recordable;
      // return <ElDialog {...propsData}>{extendSlots(slots)}</ElDialog>;
      return (
        <ElDialog v-model={dialogVisible} modelValue={dialogVisible} title="Tips" width="30%">
          {extendSlots(slots)}
        </ElDialog>
      );
    };
  },
});
