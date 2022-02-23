<!--
 * @Author: your name
 * @Date: 2022-01-26 09:50:49
 * @LastEditTime: 2022-01-26 10:45:04
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\components\Basic\src\BasicArrow.vue
-->
<!--
 * @Author: Vben
 * @Description: Arrow component with animation
-->
<template>
  <span :class="getClass">
    <Icon icon="ion:chevron-forward" :style="$attrs.iconStyle" />
  </span>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { Icon } from '/@/components/Icon';
  import { useDesign } from '/@/hooks/web/useDesign';

  const props = defineProps({
    /**
     * Arrow expand state
     */
    expand: { type: Boolean },
    /**
     * Arrow up by default
     */
    up: { type: Boolean },
    /**
     * Arrow down by default
     */
    down: { type: Boolean },
    /**
     * Cancel padding/margin for inline
     */
    inset: { type: Boolean },
  });

  const { prefixCls } = useDesign('basic-arrow');

  // get component class
  const getClass = computed(() => {
    const { expand, up, down, inset } = props;
    return [
      prefixCls,
      {
        [`${prefixCls}--active`]: expand,
        up,
        inset,
        down,
      },
    ];
  });
</script>
<style lang="less" scoped>
  // @prefix-cls: ~'@{namespace}-basic-arrow';

  // .@{prefix-cls} {
  //   display: inline-block;
  //   cursor: pointer;
  //   transform: rotate(0deg);
  //   transition: all 0.3s ease 0.1s;
  //   transform-origin: center center;

  //   &--active {
  //     transform: rotate(90deg);
  //   }

  //   &.inset {
  //     line-height: 0px;
  //   }

  //   &.up {
  //     transform: rotate(-90deg);
  //   }

  //   &.down {
  //     transform: rotate(90deg);
  //   }

  //   &.up.@{prefix-cls}--active {
  //     transform: rotate(90deg);
  //   }

  //   &.down.@{prefix-cls}--active {
  //     transform: rotate(-90deg);
  //   }
  // }
</style>
