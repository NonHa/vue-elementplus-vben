<template>
  <div :class="getClass">
    <template v-if="canFullscreen">
      <ElTooltip :title="'component.modal.restore'" placement="bottom" v-if="fullScreen">
        <Female role="full" @click="handleFullScreen" />
      </ElTooltip>
      <ElTooltip :title="'component.modal.maximize'" placement="bottom" v-else>
        <FullScreen role="close" @click="handleFullScreen" />
      </ElTooltip>
    </template>
    <ElTooltip :title="'component.modal.close'" placement="bottom">
      <Close @click="handleCancel" />
    </ElTooltip>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { Female, FullScreen, Close } from "@element-plus/icons-vue";
import { useDesign } from "/@/hooks/web/useDesign";
import { ElTooltip } from "element-plus";
// import { useI18n } from '/@/hooks/web/useI18n';

export default defineComponent({
  name: "ModalClose",
  components: { ElTooltip, Female, FullScreen, Close },
  props: {
    canFullscreen: { type: Boolean, default: true },
    fullScreen: { type: Boolean },
  },
  emits: ["cancel", "fullscreen"],
  setup(props, { emit }) {
    const { prefixCls } = useDesign("basic-modal-close");
    // const { t } = useI18n();

    const getClass = computed(() => {
      return [
        prefixCls,
        `${prefixCls}--custom`,
        {
          [`${prefixCls}--can-full`]: props.canFullscreen,
        },
      ];
    });

    function handleCancel(e: Event) {
      emit("cancel", e);
    }

    function handleFullScreen(e: Event) {
      e?.stopPropagation();
      e?.preventDefault();
      emit("fullscreen");
    }

    return {
      // t,
      getClass,
      prefixCls,
      handleCancel,
      handleFullScreen,
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~"@{namespace}-basic-modal-close";
.@{prefix-cls} {
  display: flex;
  height: 95%;
  align-items: center;

  > span {
    margin-left: 48px;
    font-size: 16px;
  }

  &--can-full {
    > span {
      margin-left: 12px;
    }
  }

  &:not(&--can-full) {
    > span:nth-child(1) {
      &:hover {
        font-weight: 700;
      }
    }
  }

  & span:nth-child(1) {
    display: inline-block;
    padding: 10px;

    &:hover {
      color: @primary-color;
    }
  }

  & span:last-child {
    &:hover {
      color: @error-color;
    }
  }
}
</style>
