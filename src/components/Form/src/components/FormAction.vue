<template>
  <ElCol v-bind="actionColOpt" v-if="showActionButtonGroup">
    <div style="width: 100%" :style="{ textAlign: actionColOpt.style.textAlign }">
      <ElFormItem>
        <slot name="resetBefore"></slot>
        <Button
          class="mr-2"
          v-bind="getResetBtnOptions"
          @click="resetAction"
          v-if="showResetButton"
        >
          重置
        </Button>
        <slot name="submitBefore"></slot>

        <Button
          type="primary"
          class="mr-2"
          v-bind="getSubmitBtnOptions"
          @click="submitAction"
          v-if="showSubmitButton"
        >
          {{ submitButtonOptions.text || '查询' }}
        </Button>

        <slot name="advanceBefore"></slot>
        <Button
          text
          type="info"
          size="small"
          @click="toggleAdvanced"
          v-if="showAdvancedButton && !hideAdvanceBtn"
        >
          {{ isAdvanced ? '收起' : '展开' }}
          <BasicArrow class="ml-1" :expand="!isAdvanced" up />
        </Button>
        <slot name="advanceAfter"></slot>
      </ElFormItem>
    </div>
  </ElCol>
</template>
<script lang="ts">
import type { ColEx } from '../types/index';
//import type { ButtonProps } from 'ant-design-vue/es/button/buttonTypes';
import { defineComponent, computed, PropType, unref } from 'vue';
import { ElFormItem, ElCol } from 'element-plus';
import { Button, ButtonProps } from '/@/components/Button';
import { BasicArrow } from '/@/components/Basic';
import { useFormContext } from '../hooks/useFormContext';
// import { useI18n } from '/@/hooks/web/useI18n';
import { propTypes } from '/@/utils/propTypes';

type ButtonOptions = Partial<ButtonProps> & { text: string };

export default defineComponent({
  name: 'BasicFormAction',
  components: {
    ElFormItem,
    Button,
    BasicArrow,
    ElCol
  },
  props: {
    showActionButtonGroup: propTypes.bool.def(true),
    showResetButton: propTypes.bool.def(true),
    showSubmitButton: propTypes.bool.def(true),
    showAdvancedButton: propTypes.bool.def(true),
    resetButtonOptions: {
      type: Object as PropType<ButtonOptions>,
      default: () => ({})
    },
    submitButtonOptions: {
      type: Object as PropType<ButtonOptions>,
      default: () => ({})
    },
    actionColOptions: {
      type: Object as PropType<Partial<ColEx>>,
      default: () => ({})
    },
    actionSpan: propTypes.number.def(6),
    isAdvanced: propTypes.bool,
    hideAdvanceBtn: propTypes.bool
  },
  emits: ['toggle-advanced'],
  setup(props, { emit }) {
    // const { t } = useI18n();
    const { submitButtonOptions } = unref(props);
    const actionColOpt = computed(() => {
      const { showAdvancedButton, actionSpan: span, actionColOptions } = props;
      const actionSpan = 24 - span;
      const advancedSpanObj = showAdvancedButton ? { span: actionSpan < 6 ? 24 : actionSpan } : {};
      const actionColOpt: Partial<ColEx> = {
        style: { textAlign: 'right' },
        span: showAdvancedButton ? 6 : 4,
        ...advancedSpanObj,
        ...actionColOptions
      };
      return actionColOpt;
    });

    const getResetBtnOptions = computed((): ButtonOptions => {
      return Object.assign(
        {
          // text: true
        },
        props.resetButtonOptions
      );
    });

    const getSubmitBtnOptions = computed(() => {
      return Object.assign({}, { ...props.submitButtonOptions, text: null });
    });

    function toggleAdvanced() {
      emit('toggle-advanced');
    }

    return {
      // t,
      actionColOpt,
      getResetBtnOptions,
      getSubmitBtnOptions,
      toggleAdvanced,
      ...useFormContext()
    };
  }
});
</script>

<style lang="less" scoped>
/deep/.el-form-item__content {
  display: block;
}
</style>
