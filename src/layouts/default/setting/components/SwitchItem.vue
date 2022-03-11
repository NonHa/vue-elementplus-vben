<!--
 * @Author: your name
 * @Date: 2022-02-22 17:16:51
 * @LastEditTime: 2022-03-01 15:18:00
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\layouts\default\setting\components\SwitchItem.vue
-->
<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <ElSwitch
      v-bind="getBindValue"
      @change="handleChange"
      :disabled="disabled"
      checkedChildren="on"
      unCheckedChildren="off"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

import { ElSwitch } from "element-plus";
import { useDesign } from "/@/hooks/web/useDesign";
// import { useI18n } from '/@/hooks/web/useI18n';
import { baseHandler } from "../handler";
import { HandlerEnum } from "../enum";

export default defineComponent({
  name: "SwitchItem",
  components: { ElSwitch },
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
      type: Boolean,
    },
  },
  setup(props) {
    const { prefixCls } = useDesign("setting-switch-item");
    // const { t } = useI18n();

    const getBindValue = computed(() => {
      return props.def ? { checked: props.def } : {};
    });
    function handleChange(e) {
      props.event && baseHandler(props.event, e);
    }
    return {
      prefixCls,
      // t,
      handleChange,
      getBindValue,
    };
  },
});
</script>
<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-setting-switch-item";

.@{prefix-cls} {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
}
</style>
