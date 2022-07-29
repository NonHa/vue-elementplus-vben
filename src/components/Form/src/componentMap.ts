import type { Component } from 'vue';
import type { ComponentType } from './types/index';

/**
 * Component list, register here to setting it in the form
 */
import {
  ElInput,
  ElSelect,
  ElRadio,
  ElCheckbox,
  ElAutocomplete,
  ElCascader,
  ElDatePicker,
  ElInputNumber,
  ElSwitch,
  ElTimePicker,
  ElSlider,
  ElRate,
  ElDivider,
  ElCheckboxGroup,
  ElRadioGroup
} from 'element-plus';

import ApiRadioGroup from './components/ApiRadioGroup.vue';
import RadioButtonGroup from './components/RadioButtonGroup.vue';
import ApiSelect from './components/ApiSelect.vue';
import ApiTree from './components/ApiTree.vue';
import ApiTreeSelect from './components/ApiTreeSelect.vue';
import ApiCascader from './components/ApiCascader.vue';
import BaseSelect from './components/BaseSelect.vue';
import { BasicUpload } from '/@/components/Upload';
import { StrengthMeter } from '/@/components/StrengthMeter';
import { IconPicker } from '/@/components/Icon';
import { CountdownInput } from '/@/components/CountDown';

interface comType {
  com: Component;
  type?: string;
}
// const componentMap = new Map<ComponentType, Component>();
const componentMap = new Map<ComponentType, comType>();

componentMap.set('ElInput', {
  com: ElInput
});
componentMap.set('ElInputGroup', {
  com: ElInput,
  type: 'text'
});
componentMap.set('ElInputPassword', {
  com: ElInput,
  type: 'password'
});
componentMap.set('ElInputSearch', {
  com: ElInput,
  type: 'search'
});
componentMap.set('ElInputTextArea', {
  com: ElInput,
  type: 'textArea'
});
componentMap.set('ElInputNumber', {
  com: ElInputNumber
});
componentMap.set('ElAutoComplete', {
  com: ElAutocomplete
});

componentMap.set('ElSelect', {
  com: BaseSelect
});
componentMap.set('ElApiSelect', {
  com: ApiSelect
});
componentMap.set('ElApiTree', {
  com: ApiTree
});
// componentMap.set('ElTreeSelect', ElTreeSelect);
componentMap.set('ElApiTreeSelect', {
  com: ApiTreeSelect
});
componentMap.set('ElApiRadioGroup', {
  com: ApiRadioGroup
});
componentMap.set('ElSwitch', {
  com: ElSwitch
});
componentMap.set('ElRadioButtonGroup', {
  com: RadioButtonGroup
});
componentMap.set('ElRadioGroup', {
  com: ElRadioGroup
});
componentMap.set('ElCheckbox', {
  com: ElCheckbox
});
componentMap.set('ElCheckboxGroup', {
  com: ElCheckboxGroup
});
componentMap.set('ElApiCascader', {
  com: ApiCascader
});
componentMap.set('ElCascader', {
  com: ElCascader
});
componentMap.set('ElSlider', {
  com: ElSlider
});
componentMap.set('ElRate', {
  com: ElRate
});

componentMap.set('ElDatePicker', {
  com: ElDatePicker
});
componentMap.set('ElMonthPicker', {
  com: ElDatePicker,
  type: 'month'
});
componentMap.set('ElRangePicker', {
  com: ElDatePicker,
  type: 'daterange'
});
componentMap.set('ElWeekPicker', {
  com: ElDatePicker,
  type: 'week'
});
componentMap.set('ElTimePicker', {
  com: ElTimePicker
});
componentMap.set('ElStrengthMeter', {
  com: StrengthMeter
});
componentMap.set('ElIconPicker', {
  com: IconPicker
});
componentMap.set('ElInputCountDown', {
  com: CountdownInput
});

componentMap.set('ElUpload', {
  com: BasicUpload
});
componentMap.set('ElDivider', {
  com: ElDivider
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
