<script lang="tsx">
  import type { PropType, Ref } from 'vue';
  import type { FormActionType, FormProps } from '../types/form';
  import type { FormSchema } from '../types/form';
  import type { FormItemRule } from 'element-plus/es/tokens/form';
  import type { TableActionType } from '/@/components/Table';
  import { defineComponent, computed, unref, toRefs } from 'vue';
  import { ElFormItem, ElCol, ElDivider } from 'element-plus';
  import { componentMap } from '../componentMap';
  // import { BasicHelp } from '/@/components/Basic';
  import { isBoolean, isFunction } from '/@/utils/is';
  import { getSlot } from '/@/utils/helper/tsxHelper';
  import { createPlaceholderMessage, setComponentRuleType } from '../helper';
  import { upperFirst, cloneDeep } from 'lodash-es';
  import { useItemLabelWidth } from '../hooks/useLabelWidth';
  // import { useI18n } from '/@/hooks/web/useI18n';
  // type FormItemRule = {
  //   /** validation error message */
  //   message?: VueNode;
  //   /** built-in validation type, available options: https://github.com/yiminghe/async-validator#type */
  //   type?: string;
  //   /** indicates whether field is required */
  //   required?: boolean;
  //   /** treat required fields that only contain whitespace as errors */
  //   whitespace?: boolean;
  //   /** validate the exact length of a field */
  //   len?: number;
  //   /** validate the min length of a field */
  //   min?: number;
  //   /** validate the max length of a field */
  //   max?: number;
  //   /** validate the value from a list of possible values */
  //   enum?: string | string[];
  //   /** validate from a regular expression */
  //   pattern?: RegExp;
  //   /** transform a value before validation */
  //   transform?: (value: any) => any;
  //   /** custom validate function (Note: callback must be called) */
  //   validator?: (rule: any, value: any, callback: any, source?: any, options?: any) => any;
  //   trigger?: string;
  // };
  export default defineComponent({
    name: 'BasicFormItem',
    inheritAttrs: false,
    props: {
      schema: {
        type: Object as PropType<FormSchema>,
        default: () => ({}),
      },
      formProps: {
        type: Object as PropType<FormProps>,
        default: () => ({}),
      },
      allDefaultValues: {
        type: Object as PropType<Recordable>,
        default: () => ({}),
      },
      formModel: {
        type: Object as PropType<Recordable>,
        default: () => ({}),
      },
      setFormModel: {
        type: Function as PropType<(key: string, value: any) => void>,
        default: null,
      },
      tableAction: {
        type: Object as PropType<TableActionType>,
      },
      formActionType: {
        type: Object as PropType<FormActionType>,
      },
    },
    setup(props, { slots }) {
      // const { t } = useI18n();

      const { schema, formProps } = toRefs(props) as {
        schema: Ref<FormSchema>;
        formProps: Ref<FormProps>;
      };

      const itemLabelWidthProp = useItemLabelWidth(schema, formProps);

      const getValues = computed(() => {
        const { allDefaultValues, formModel, schema } = props;
        const { mergeDynamicData } = props.formProps;
        return {
          field: schema.field,
          model: formModel,
          values: {
            ...mergeDynamicData,
            ...allDefaultValues,
            ...formModel,
          } as Recordable,
          schema: schema,
        };
      });

      const getComponentsProps = computed(() => {
        const { schema, tableAction, formModel, formActionType } = props;
        let { componentProps = {} } = schema;
        if (isFunction(componentProps)) {
          componentProps = componentProps({ schema, tableAction, formModel, formActionType }) ?? {};
        }
        if (schema.component === 'ElDivider') {
          componentProps = Object.assign({ type: 'horizontal' }, componentProps, {
            orientation: 'left',
            plain: true,
          });
        }
        return componentProps as Recordable;
      });

      const getDisable = computed(() => {
        const { disabled: globDisabled } = props.formProps;
        const { dynamicDisabled } = props.schema;
        const { disabled: itemDisabled = false } = unref(getComponentsProps);
        let disabled = !!globDisabled || itemDisabled;
        if (isBoolean(dynamicDisabled)) {
          disabled = dynamicDisabled;
        }
        if (isFunction(dynamicDisabled)) {
          disabled = dynamicDisabled(unref(getValues));
        }
        return disabled;
      });

      function getShow(): { isShow: boolean; isIfShow: boolean } {
        const { show, ifShow } = props.schema;
        const { showAdvancedButton } = props.formProps;
        const itemIsAdvanced = showAdvancedButton
          ? isBoolean(props.schema.isAdvanced)
            ? props.schema.isAdvanced
            : true
          : true;

        let isShow = true;
        let isIfShow = true;

        if (isBoolean(show)) {
          isShow = show;
        }
        if (isBoolean(ifShow)) {
          isIfShow = ifShow;
        }
        if (isFunction(show)) {
          isShow = show(unref(getValues));
        }
        if (isFunction(ifShow)) {
          isIfShow = ifShow(unref(getValues));
        }
        isShow = isShow && itemIsAdvanced;
        isShow = true;
        isIfShow = true;
        return { isShow, isIfShow };
      }

      function handleRules(): FormItemRule[] {
        const {
          rules: defRules = [],
          component,
          rulesMessageJoinLabel,
          label,
          dynamicRules,
          required,
        } = props.schema;

        if (isFunction(dynamicRules)) {
          return dynamicRules(unref(getValues)) as FormItemRule[];
        }

        let rules: FormItemRule[] = cloneDeep(defRules) as FormItemRule[];
        const { rulesMessageJoinLabel: globalRulesMessageJoinLabel } = props.formProps;

        const joinLabel = Reflect.has(props.schema, 'rulesMessageJoinLabel')
          ? rulesMessageJoinLabel
          : globalRulesMessageJoinLabel;
        const defaultMsg = createPlaceholderMessage(component) + `${joinLabel ? label : ''}`;

        // function validator(rule: any, value: any) {
        //   const msg = rule.message || defaultMsg;
        //   if (value === undefined || isNull(value)) {
        //     // 空值
        //     return Promise.reject(msg);
        //   } else if (Array.isArray(value) && value.length === 0) {
        //     // 数组类型
        //     return Promise.reject(msg);
        //   } else if (typeof value === 'string' && value.trim() === '') {
        //     // 空字符串
        //     return Promise.reject(msg);
        //   } else if (
        //     typeof value === 'object' &&
        //     Reflect.has(value, 'checked') &&
        //     Reflect.has(value, 'halfChecked') &&
        //     Array.isArray(value.checked) &&
        //     Array.isArray(value.halfChecked) &&
        //     value.checked.length === 0 &&
        //     value.halfChecked.length === 0
        //   ) {
        //     // 非关联选择的tree组件
        //     return Promise.reject(msg);
        //   }
        //   return Promise.resolve();
        // }

        const getRequired = isFunction(required) ? required(unref(getValues)) : required;

        if ((!rules || rules.length === 0) && getRequired) {
          rules = [{ required: getRequired }];
        }

        const requiredRuleIndex: number = rules.findIndex(
          (rule) => Reflect.has(rule, 'required') && !Reflect.has(rule, 'validator')
        );

        if (requiredRuleIndex !== -1) {
          const rule = rules[requiredRuleIndex];
          const { isShow } = getShow();
          if (!isShow) {
            rule.required = false;
          }
          if (component) {
            if (!Reflect.has(rule, 'type')) {
              rule.type = component === 'ElInputNumber' ? 'number' : 'string';
            }

            rule.message = rule.message || defaultMsg;

            if (component.includes('Input') || component.includes('Textarea')) {
              rule.whitespace = true;
            }
            const valueFormat = unref(getComponentsProps)?.valueFormat;
            setComponentRuleType(rule, component, valueFormat);
          }
        }

        // Maximum input length rule check
        // const characterInx = rules.findIndex((val) => val.max);
        // if (characterInx !== -1 && !rules[characterInx].validator) {
        //   rules[characterInx].message =
        //     rules[characterInx].message ||
        //     ('component.form.maxTip', [rules[characterInx].max] as Recordable);
        // }
        return rules;
      }

      function renderComponent() {
        const {
          renderComponentContent,
          component,
          field,
          changeEvent = 'change',
          valueField,
        } = props.schema;

        const isCheck = component && ['Switch', 'Checkbox'].includes(component);

        const eventKey = `on${upperFirst(changeEvent)}`;

        const on = {
          [eventKey]: (...args: Nullable<Recordable>[]) => {
            const [e] = args;
            if (propsData[eventKey]) {
              propsData[eventKey](...args);
            }
            const target = e ? e.target : null;
            const value = target ? (isCheck ? target.checked : target.value) : e;
            props.setFormModel(field, value);
          },
        };
        const Comp = componentMap.get(component)?.com as ReturnType<typeof defineComponent>;

        const { autoSetPlaceHolder, size } = props.formProps;
        const propsData: Recordable = {
          allowClear: true,
          getPopupContainer: (trigger: Element) => trigger.parentNode,
          size,
          ...unref(getComponentsProps),
          disabled: unref(getDisable),
        };

        const isCreatePlaceholder = !propsData.disabled && autoSetPlaceHolder;
        // RangePicker place is an array
        if (isCreatePlaceholder && component !== 'ElRangePicker' && component) {
          propsData.placeholder =
            unref(getComponentsProps)?.placeholder || createPlaceholderMessage(component);
        }
        propsData.codeField = field;
        propsData.formValues = unref(getValues);

        const bindValue: Recordable = {
          [valueField || (isCheck ? 'checked' : 'modelValue')]: props.formModel[field],
        };

        const compAttr: Recordable = {
          ...propsData,
          ...on,
          ...bindValue,
        };

        if (!renderComponentContent) {
          return <Comp {...compAttr} v-model={props.formModel[field]} />;
        }
        const compSlot = isFunction(renderComponentContent)
          ? { ...renderComponentContent(unref(getValues)) }
          : {
              default: () => renderComponentContent,
            };
        return (
          <Comp {...compAttr} v-model={props.formModel[field]}>
            {compSlot}
          </Comp>
        );
      }

      function renderLabelHelpMessage() {
        const { label, helpMessage, helpComponentProps, subLabel } = props.schema;
        const renderLabel = subLabel ? (
          <span>
            {label} <span class="text-secondary">{subLabel}</span>
          </span>
        ) : (
          label
        );
        const getHelpMessage = isFunction(helpMessage)
          ? helpMessage(unref(getValues))
          : helpMessage;
        if (!getHelpMessage || (Array.isArray(getHelpMessage) && getHelpMessage.length === 0)) {
          // return renderLabel;
          return '444';
        }
        return 'kkkk';
        // <span>
        //   {renderLabel}
        //   <BasicHelp placement="top" class="mx-1" text={getHelpMessage} {...helpComponentProps} />
        // </span>
      }

      function renderItem() {
        const { itemProps, slot, render, field, suffix, component, label } = props.schema;
        const { labelCol, wrapperCol } = unref(itemLabelWidthProp);
        const { colon } = props.formProps;

        if (component === 'ElDivider') {
          return (
            <ElCol span={24}>
              <ElDivider {...unref(getComponentsProps)}>{renderLabelHelpMessage()}</ElDivider>
            </ElCol>
          );
        } else {
          const getContent = () => {
            return slot
              ? getSlot(slots, slot, unref(getValues))
              : render
              ? render(unref(getValues))
              : renderComponent();
          };

          const showSuffix = !!suffix;
          const getSuffix = isFunction(suffix) ? suffix(unref(getValues)) : suffix;

          return (
            <ElFormItem
              name={field}
              colon={colon}
              class={{ 'suffix-item': showSuffix }}
              {...(itemProps as Recordable)}
              label={label as string}
              rules={handleRules()}
              labelCol={labelCol}
              wrapperCol={wrapperCol}
            >
              <div style="display:flex">
                <div style="flex:1;">{getContent()}</div>
                {showSuffix && <span class="suffix">{getSuffix}</span>}
              </div>
            </ElFormItem>
          );
        }
      }

      return () => {
        const { colProps = {}, colSlot, renderColContent, component } = props.schema;
        if (!componentMap.has(component)) {
          return null;
        }

        const { baseColProps = {} } = props.formProps;
        const realColProps = { ...baseColProps, ...colProps };
        const { isIfShow, isShow } = getShow();
        const values = unref(getValues);

        const getContent = () => {
          return colSlot
            ? getSlot(slots, colSlot, values)
            : renderColContent
            ? renderColContent(values)
            : renderItem();
        };

        return (
          isIfShow && (
            <span v-show={isShow}>
              <ElCol {...realColProps}>{getContent()}</ElCol>
            </span>
          )
        );
      };
    },
  });
</script>
