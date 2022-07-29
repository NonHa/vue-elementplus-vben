import { computed, defineComponent, unref, toRef, toRefs } from 'vue';
import type { Slot } from 'vue';
import { columnProps } from './props';
import { componentMap } from '/@/components/Form/src/componentMap';
import { upperFirst } from '/@/components/Transition/src/ExpandTransition';
import { isFunction } from '/@/utils/is';
import { getSlot } from '/@/utils/helper/tsxHelper';

export default defineComponent({
  name: 'ColumnContent',
  props: columnProps,
  emits: ['onInput'],
  setup(props, { emit, slots }) {
    const { row, field, column, getColumnsSlots } = toRefs(props);

    const slot = unref(column).slot;
    const type = unref(column).editComponent;
    const renderColumnComponent = unref(column).renderColumnComponent;

    function renderCellContent() {
      if (!type) {
        if (slot) {
          return <span>{getSlot(slots, 'col-' + field.value)}</span>;
        } else {
          return (
            <span>
              {(unref(column).formatter && unref(column).formatter(row, field, column)) ||
                row.value[unref(field)]}
            </span>
          );
        }
        // return <span>{row.value[unref(field)]}</span>;
      } else {
        const Comp = componentMap.get(type)?.com as ReturnType<typeof defineComponent>;
        const on = {};
        if (unref(column).editEvnets) {
          const list = Object.entries(unref(column).editEvnets);
          for (let index = 0; index < list.length; index++) {
            const event = 'on' + upperFirst(list[index][0]);
            on[event] = list[index][1]
              ? list[index][1]
              : () => {
                  emit(event, row, field, unref(column));
                };
          }
        }
        const comAttr = {
          ...unref(column).editComponentProps,
          ...on
        };
        if (!renderColumnComponent) {
          return <Comp {...comAttr} v-model={unref(row)[unref(field)]}></Comp>;
        } else {
          const comSlots = isFunction(renderColumnComponent)
            ? {
                ...renderColumnComponent({ row })
              }
            : {
                default: () => renderColumnComponent
              };
          return (
            <Comp {...comAttr} v-model={unref(row)[unref(field)]}>
              {comSlots}
            </Comp>
          );
        }
      }
    }
    return () => {
      return <>{renderCellContent()}</>;
    };
  }
});
