<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <ElInputNumber
      v-model="inputNum"
      v-bind="$attrs"
      size="small"
      :class="`${prefixCls}-input-number`"
      @change="handleChange"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref } from 'vue';

  import { ElInputNumber } from 'element-plus';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { baseHandler } from '../handler';
  import { HandlerEnum } from '../enum';

  export default defineComponent({
    name: 'InputNumberItem',
    components: { ElInputNumber },
    props: {
      event: {
        type: Number as PropType<HandlerEnum>,
      },
      title: {
        type: String,
      },
    },
    setup(props) {
      let inputNum = ref(0);
      const { prefixCls } = useDesign('setting-input-number-item');

      function handleChange(e) {
        props.event && baseHandler(props.event, e);
      }
      return {
        prefixCls,
        inputNum,
        handleChange,
      };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-setting-input-number-item';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
    box-sizing: border-box;
    line-height: 0;
    align-items: center;

    &-input-number {
      width: 126px;
    }
  }
</style>
