<!--
 * @Author: your name
 * @Date: 2022-02-22 17:16:51
 * @LastEditTime: 2022-03-01 15:15:09
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\layouts\default\setting\components\ThemeColorPicker.vue
-->
<template>
  <div :class="prefixCls">
    <template v-for="color in colorList || []" :key="color">
      <span
        @click="handleClick(color)"
        :class="[
          `${prefixCls}__item`,
          {
            [`${prefixCls}__item--active`]: def === color,
          },
        ]"
        :style="{ background: color }"
      >
        <Check />
      </span>
    </template>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Check } from '@element-plus/icons-vue';

  import { useDesign } from '/@/hooks/web/useDesign';

  import { baseHandler } from '../handler';
  import { HandlerEnum } from '../enum';

  export default defineComponent({
    name: 'ThemeColorPicker',
    components: { Check },
    props: {
      colorList: {
        type: Array as PropType<string[]>,
        defualt: [],
      },
      event: {
        type: Number as PropType<HandlerEnum>,
      },
      def: {
        type: String,
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('setting-theme-picker');

      function handleClick(color: string) {
        props.event && baseHandler(props.event, color);
      }
      return {
        prefixCls,
        handleClick,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-setting-theme-picker';

  .@{prefix-cls} {
    display: flex;
    flex-wrap: wrap;
    margin: 16px 0;
    justify-content: space-around;

    &__item {
      width: 20px;
      height: 20px;
      cursor: pointer;
      border: 1px solid #ddd;
      border-radius: 2px;

      svg {
        display: none;
        padding: 0;
        color: #fff;
      }

      &--active {
        border: 1px solid lighten(@primary-color, 10%);

        svg {
          display: inline-block;
          margin: 0 0 12px 2px;
          font-size: 12px;
          fill: @white !important;
          padding: 0;
        }
      }
    }
  }
</style>
