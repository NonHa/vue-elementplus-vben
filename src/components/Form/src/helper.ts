import type { FormItemRule } from 'element-plus/es/tokens/form';
import type { ComponentType } from './types/index';
// import { useI18n } from '/@/hooks/web/useI18n';
import { dateUtil } from '/@/utils/dateUtil';
import { isNumber, isObject } from '/@/utils/is';

// const { t } = useI18n();

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (component.includes('ElInput') || component.includes('ElComplete')) {
    return '';
  }
  if (component.includes('ElPicker')) {
    return '';
  }
  if (
    component.includes('ElSelect') ||
    component.includes('ElCascader') ||
    component.includes('ElCheckbox') ||
    component.includes('ElRadio') ||
    component.includes('ElSwitch')
  ) {
    // return `请选择${label}`;
    return '';
  }
  return '';
}

const DATE_TYPE = ['ElDatePicker', 'ElMonthPicker', 'ElWeekPicker', 'ElTimePicker'];

function genType() {
  return [...DATE_TYPE, 'ElRangePicker'];
}

export function setComponentRuleType(
  rule: FormItemRule,
  component: ComponentType,
  valueFormat: string
) {
  if (['ElDatePicker', 'ElMonthPicker', 'ElWeekPicker', 'ElTimePicker'].includes(component)) {
    rule.type = valueFormat ? 'string' : 'object';
  } else if (['ElRangePicker', 'ElUpload', 'ElCheckboxGroup', 'ElTimePicker'].includes(component)) {
    rule.type = 'array';
  } else if (['ElInputNumber'].includes(component)) {
    rule.type = 'number';
  }
}

export function processDateValue(attr: Recordable, component: string) {
  const { valueFormat, value } = attr;
  if (valueFormat) {
    attr.value = isObject(value) ? dateUtil(value).format(valueFormat) : value;
  } else if (DATE_TYPE.includes(component) && value) {
    attr.value = dateUtil(attr.value);
  }
}

export function handleInputNumberValue(component?: ComponentType, val?: any) {
  if (!component) return val;
  if (['ElInput', 'ElInputPassword', 'ElInputSearch', 'ElInputTextArea'].includes(component)) {
    return val && isNumber(val) ? `${val}` : val;
  }
  return val;
}

/**
 * 时间字段
 */
export const dateItemType = genType();

export const defaultValueComponents = [
  'ElInput',
  'ElInputPassword',
  'ElInputSearch',
  'ElInputTextArea'
];
