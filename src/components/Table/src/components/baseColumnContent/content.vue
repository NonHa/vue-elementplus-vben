<script lang="tsx">
import type { Slot } from 'vue';
import { computed, defineComponent, unref, toRef } from 'vue';
import { columnProps } from './props';
import { componentMap } from '/@/components/Form/src/componentMap';
import { upperFirst } from '/@/components/Transition/src/ExpandTransition';
import { isFunction } from '/@/utils/is';

export default defineComponent({
  name: 'ColumnContent',
  props: columnProps,
  emits: ['onInput'],
  setup(props, { emit, slots }) {
    let { row, field, column } = unref(props);
    console.log('row', row);

    let type = unref(column).editComponent;
    let slot = unref(column).slot;
    let renderColumnComponent = unref(column).renderColumnComponent;

    function renderCellContent() {
      if (!type) {
        if (slot) {
          let fun = unref(slots)[`${field}`] as Slot;

          return <span>{fun()}</span>;
        } else {
          return <span>{row[field]}</span>;
        }
      } else {
        const Comp = componentMap.get(type)?.com as ReturnType<typeof defineComponent>;
        const on = {};
        if (column.editEvnets) {
          let list = Object.entries(column.editEvnets);
          for (let index = 0; index < list.length; index++) {
            let event = 'on' + upperFirst(list[index][0]);
            on[event] = list[index][1]
              ? list[index][1]
              : () => {
                  emit(event, row, field, column);
                };
          }
        }
        const comAttr = {
          ...column.editComponentProps,
          ...on
        };
        if (!renderColumnComponent) {
          return <Comp {...comAttr} v-model={row[field]}></Comp>;
        } else {
          const comSlots = isFunction(renderColumnComponent)
            ? {
                ...renderColumnComponent({ row })
              }
            : {
                default: () => renderColumnComponent
              };
          return (
            <Comp {...comAttr} v-model={row[field]}>
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
</script>
