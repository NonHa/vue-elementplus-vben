import {
  defineComponent,
  h,
  computed,
  ref,
  getCurrentInstance,
  onUnmounted,
  inject,
  Ref,
} from 'vue';
import { on, off } from '/@/utils/domUtils';

import { renderThumbStyle, BAR_MAP } from './util';

export default defineComponent({
  name: 'Bar',

  props: {
    vertical: Boolean,
    size: String,
    move: Number,
  },

  setup(props) {
    // getCurrentInstance 支持访问内部组件实例。
    const instance = getCurrentInstance();
    const thumb = ref();
    const wrap = inject('scroll-bar-wrap', {} as Ref<Nullable<HTMLElement>>) as any;
    const bar = computed(() => {
      return BAR_MAP[props.vertical ? 'vertical' : 'horizontal'];
    });
    const barStore = ref<Recordable>({});
    const cursorDown = ref();
    const clickThumbHandler = (e: any) => {
      console.log('e========', e);

      // prevent click event of right button
      if (e.ctrlKey || e.button === 2) {
        return;
      }
      //返回一个 Selection 对象，表示用户选择的文本范围或光标的当前位置。
      //Selection.removeAllRanges()方法会从当前selection对象中移除所有的range对象,
      //取消所有的选择只 留下anchorNode 和focusNode属性并将其设置为null。
      window.getSelection()?.removeAllRanges();
      startDrag(e);
      barStore.value[bar.value.axis] =
        e.currentTarget[bar.value.offset] -
        (e[bar.value.client] - e.currentTarget.getBoundingClientRect()[bar.value.direction]);
    };

    const clickTrackHandler = (e: any) => {
      const offset = Math.abs(
        e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]
      );
      const thumbHalf = thumb.value[bar.value.offset] / 2;
      const thumbPositionPercentage =
        ((offset - thumbHalf) * 100) / instance?.vnode.el?.[bar.value.offset];

      wrap.value[bar.value.scroll] =
        (thumbPositionPercentage * wrap.value[bar.value.scrollSize]) / 100;
    };
    const startDrag = (e: any) => {
      // Event 接口的 stopImmediatePropagation() 方法阻止监听同一事件的其他事件监听器被调用。
      e.stopImmediatePropagation();
      cursorDown.value = true;
      on(document, 'mousemove', mouseMoveDocumentHandler);
      on(document, 'mouseup', mouseUpDocumentHandler);
      document.onselectstart = () => false;
    };

    const mouseMoveDocumentHandler = (e: any) => {
      if (cursorDown.value === false) return;
      const prevPage = barStore.value[bar.value.axis];

      if (!prevPage) return;

      const offset =
        (instance?.vnode.el?.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) *
        -1;
      const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
      const thumbPositionPercentage =
        ((offset - thumbClickPosition) * 100) / instance?.vnode.el?.[bar.value.offset];
      wrap.value[bar.value.scroll] =
        (thumbPositionPercentage * wrap.value[bar.value.scrollSize]) / 100;
    };

    function mouseUpDocumentHandler() {
      cursorDown.value = false;
      barStore.value[bar.value.axis] = 0;
      off(document, 'mousemove', mouseMoveDocumentHandler);
      document.onselectstart = null;
    }

    onUnmounted(() => {
      off(document, 'mouseup', mouseUpDocumentHandler);
    });

    return () =>
      h(
        'div',
        {
          class: ['scrollbar__bar', 'is-' + bar.value.key],
          onMousedown: clickTrackHandler,
        },
        h('div', {
          ref: thumb,
          class: 'scrollbar__thumb',
          onMousedown: clickThumbHandler,
          style: renderThumbStyle({
            size: props.size,
            move: props.move,
            bar: bar.value,
          }),
        })
      );
  },
});
