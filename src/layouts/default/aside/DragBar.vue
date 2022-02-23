<!--
 * @Author: your name
 * @Date: 2022-01-25 15:52:42
 * @LastEditTime: 2022-01-26 09:20:56
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\layouts\default\aside\DragBar.vue
-->
<template>
  <div :style="getDragBarStyle"></div>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';

  import { useDesign } from '/@/hooks/web/useDesign';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';

  export default defineComponent({
    name: 'DargBar',
    props: {
      mobile: Boolean,
    },
    setup(props) {
      const { getMiniWidthNumber, getCollapsed, getCanDrag } = useMenuSetting();

      const { prefixCls } = useDesign('darg-bar');
      const getDragBarStyle = computed(() => {
        if (unref(getCollapsed)) {
          return { left: `${unref(getMiniWidthNumber)}px` };
        }
        return {};
      });

      const getClass = computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}--hide`]: !unref(getCanDrag) || props.mobile,
          },
        ];
      });

      return {
        prefixCls,
        getDragBarStyle,
        getClass,
      };
    },
  });
</script>
<style lang="less" scoped>
  // @prefix-cls: ~'@{namespace}-darg-bar';

  // .@{prefix-cls} {
  //   position: absolute;
  //   top: 0;
  //   right: -2px;
  //   z-index: @side-drag-z-index;
  //   width: 2px;
  //   height: 100%;
  //   cursor: col-resize;
  //   border-top: none;
  //   border-bottom: none;

  //   &--hide {
  //     display: none;
  //   }

  //   &:hover {
  //     background-color: @primary-color;
  //     box-shadow: 0 0 4px 0 rgb(28 36 56 / 15%);
  //   }
  // }
</style>
