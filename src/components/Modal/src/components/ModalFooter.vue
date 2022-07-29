<!--
 * @Author: your name
 * @Date: 2022-03-01 14:50:19
 * @LastEditTime: 2022-03-04 16:38:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\components\Modal\src\components\ModalFooter.vue
-->
<template>
  <div :class="prefixCls">
    <slot name="insertFooter"></slot>
    <ElButton @click="handleCancel" v-if="showCancelBtn">
      {{ footerBtnOption.cancelText }}
    </ElButton>
    <slot name="centerFooter"></slot>
    <!-- :type="okType" -->
    <ElButton type="primary" @click="handleOk" :loading="confirmLoading" v-if="showOkBtn">
      {{ footerBtnOption.sureText }}
    </ElButton>
    <slot name="appendFooter"></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, unref } from 'vue';
import { ElButton } from 'element-plus';
import { basicProps } from '../props';
import { useDesign } from '/@/hooks/web/useDesign';

export default defineComponent({
  name: 'BasicModalFooter',
  components: { ElButton },
  props: basicProps,
  emits: ['ok', 'cancel'],
  setup(_, { emit }) {
    const { prefixCls } = useDesign('cropper-footer');

    const footerBtnOption = computed(() => {
      return unref(_).footerBtnOption;
    });

    function handleOk(e: Event) {
      emit('ok', e);
    }

    function handleCancel(e: Event) {
      emit('cancel', e);
    }

    return { handleOk, handleCancel, prefixCls, footerBtnOption };
  }
});
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-cropper-footer';
.@{prefix-cls} {
  text-align: right;
  padding: 14px;
}
</style>
