<!--
 * @Author: your name
 * @Date: 2022-02-22 17:16:51
 * @LastEditTime: 2022-03-01 15:39:42
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\layouts\default\setting\components\SelectItem.vue
-->
<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <ElSelect
      v-bind="getBindValue"
      :class="`${prefixCls}-select`"
      @change="handleChange"
      :disabled="disabled"
      size="small"
      :options="options"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

import { ElSelect } from "element-plus";
import { useDesign } from "/@/hooks/web/useDesign";
import { baseHandler } from "../handler";
import { HandlerEnum } from "../enum";

export default defineComponent({
  name: "SelectItem",
  components: { ElSelect },
  props: {
    event: {
      type: Number as PropType<HandlerEnum>,
    },
    disabled: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    def: {
      type: [String, Number] as PropType<string | number>,
    },
    initValue: {
      type: [String, Number] as PropType<string | number>,
    },
    options: {
      type: Array as PropType<LabelValueOptions>,
      default: () => [],
    },
  },
  setup(props) {
    const { prefixCls } = useDesign("setting-select-item");
    const getBindValue = computed(() => {
      return props.def
        ? { value: props.def, defaultValue: props.initValue || props.def }
        : {};
    });

    function handleChange(e: ChangeEvent) {
      props.event && baseHandler(props.event, e);
    }
    return {
      prefixCls,
      handleChange,
      getBindValue,
    };
  },
});
</script>
<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-setting-select-item";

.@{prefix-cls} {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;

  &-select {
    width: 126px;
  }
}
</style>
