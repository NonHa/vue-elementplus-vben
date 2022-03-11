<!--
 * @Author: your name
 * @Date: 2022-03-01 14:50:19
 * @LastEditTime: 2022-03-04 16:38:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\components\Modal\src\components\ModalFooter.vue
-->
<template>
  <div>
    <slot name="insertFooter"></slot>
    <ElButton @click="handleCancel" v-if="showCancelBtn">
      {{ cancelText }}
    </ElButton>
    <slot name="centerFooter"></slot>
    <ElButton :type="okType" @click="handleOk" :loading="confirmLoading" v-if="showOkBtn">
      {{ okText }}
    </ElButton>
    <slot name="appendFooter"></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ElButton } from "element-plus";
import { basicProps } from "../props";
export default defineComponent({
  name: "BasicModalFooter",
  props: basicProps,
  components: { ElButton },
  emits: ["ok", "cancel"],
  setup(_, { emit }) {
    function handleOk(e: Event) {
      emit("ok", e);
    }

    function handleCancel(e: Event) {
      emit("cancel", e);
    }

    return { handleOk, handleCancel };
  },
});
</script>
