<!--
 * @Author: your name
 * @Date: 2022-01-06 12:01:54
 * @LastEditTime: 2022-01-28 17:29:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\components\icon\src\svgIcon.vue
-->
<template>
  <svg :style="getStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>
<script lang="ts">
  import type { CSSProperties } from 'vue';
  import { defineComponent, computed } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';

  export default defineComponent({
    name: 'SvgIcon',
    props: {
      prefix: {
        type: String,
        default: 'icon',
      },
      name: {
        type: String,
        required: true,
      },
      size: {
        type: [Number, String],
        default: 16,
      },
      spin: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('svg-icon');
      const symbolId = computed(() => `#${props.prefix}-${props.name}`);
      console.log('symbolId', symbolId.value);

      const getStyle = computed((): CSSProperties => {
        const { size } = props;
        let s = `${size}`;
        s = `${s.replace('px', '')}px`;
        return {
          width: s,
          height: s,
        };
      });
      return { symbolId, prefixCls, getStyle };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-svg-icon';

  .@{prefix-cls} {
    display: inline-block;
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentColor;
  }

  .svg-icon-spin {
    animation: loadingCircle 1s infinite linear;
  }
</style>
