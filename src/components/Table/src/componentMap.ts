import type { Component } from 'vue';
import {
  ElInput,
  ElSelect,
  ElCheckbox,
  ElInputNumber,
  ElSwitch,
  ElDatePicker,
  ElTimePicker
} from 'element-plus';
import type { ComponentType } from './types/componentType';
import { ApiSelect, ApiTreeSelect } from '/@/components/Form';
interface comType {
  com: Component;
  type?: string;
}
// const componentMap = new Map<ComponentType, Component>();
const componentMap = new Map<ComponentType, comType>();
componentMap.set('ElInput', {
  com: ElInput
});
componentMap.set('ElInputNumber', {
  com: ElInputNumber
});
componentMap.set('ElSelect', {
  com: ElSelect
});
componentMap.set('ElApiSelect', {
  com: ApiSelect
});
// componentMap.set('ElTreeSelect', ElTreeSelect);
componentMap.set('ElApiTreeSelect', {
  com: ApiTreeSelect
});
componentMap.set('ElSwitch', {
  com: ElSwitch
});
componentMap.set('ElCheckbox', {
  com: ElCheckbox
});
componentMap.set('ElDatePicker', {
  com: ElDatePicker
});
componentMap.set('ElTimePicker', {
  com: ElTimePicker
});

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, {
    com: component
  });
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };
