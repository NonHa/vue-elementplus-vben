<template>
  <ElCard :class="[prefixCls]">
    <BasicForm
      @register="registerForm"
      v-bind="getFormProps"
      :model="model"
      @submit="handleSubmit"
    />
  </ElCard>
</template>

<script lang="ts" setup>
import { computed, ref, unref } from 'vue';
import { BasicForm, useForm } from '/@/components/Form';
import { ElCard } from 'element-plus';
import { useDesign } from '/@/hooks/web/useDesign';
import { getOrderSettingSchema } from './orderData';
import { getOrderSetting, updateOrderSetting } from '/@/api/sys/order';
const [registerForm, formActions] = useForm();

const { prefixCls } = useDesign('order-setting-card');
const model = ref({});
const getFormProps = computed(() => {
  return {
    labelWidth: 120,
    schemas: getOrderSettingSchema(),
    showResetButton: false,
    submitButtonOptions: {
      text: '提交'
    }
  };
});

getOrderSetting().then((res) => {
  model.value = res.data;
});

const handleSubmit = () => {
  updateOrderSetting({ ...formActions.getFieldsValue(), id: unref(model).id }).then((res) => {});
};
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-order-setting-card';
.@{prefix-cls} {
  width: 50%;
  margin: 20px auto;
}
</style>
