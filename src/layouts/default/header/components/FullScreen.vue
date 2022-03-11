<!--
 * @Author: your name
 * @Date: 2022-02-25 10:24:57
 * @LastEditTime: 2022-03-04 15:27:40
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\layouts\default\header\components\FullScreen.vue
-->
<template>
  <ElTooltip :content="getTitle" placement="bottom">
    <span @click="toggle">
      <ELFullScreen v-if="!isFullscreen" />
      <Icon v-else icon="fluent:full-screen-minimize-16-filled" />
    </span>
  </ElTooltip>
</template>
<script lang="ts">
import { defineComponent, computed, unref } from "vue";
import { useFullscreen } from "@vueuse/core";
import { ElTooltip } from "element-plus";
import { FullScreen } from "@element-plus/icons-vue";
import Icon from "/@/components/Icon";
export default defineComponent({
  name: "FullScreen",
  components: { ElTooltip, ELFullScreen: FullScreen, Icon },

  setup() {
    const { toggle, isFullscreen } = useFullscreen();

    const getTitle = computed(() => {
      return unref(isFullscreen) ? "234" : "234";
    });

    return {
      getTitle,
      isFullscreen,
      toggle,
    };
  },
});
</script>
