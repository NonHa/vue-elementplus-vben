<template>
  <ElDrawer
    v-model="visibleRef"
    :custom-class="[prefixCls, `${prefixCls}__detail`].join(' ')"
    @close="onClose"
    direction="rtl"
    title="134"
    size="400"
  >
    <template #title v-if="!$slots.title">
      <DrawerHeader
        :title="getMergeProps.title"
        :isDetail="isDetail"
        :showDetailBack="showDetailBack"
        @close="onClose"
      >
        <template #titleToolbar>
          <slot name="titleToolbar"></slot>
        </template>
      </DrawerHeader>
    </template>
    <template v-else #title>
      <slot name="title"></slot>
    </template>

    <ScrollContainer
      :style="getScrollContentStyle"
      v-loading="getLoading"
      :loading-tip="loadingText"
    >
      <slot></slot>
    </ScrollContainer>
    <DrawerFooter v-bind="getProps" @close="onClose" @ok="handleOk" :height="getFooterHeight">
      <template #[item]="data" v-for="item in Object.keys($slots)">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </DrawerFooter>
  </ElDrawer>
</template>
<script lang="ts">
  import type { DrawerInstance, DrawerProps } from './typing';
  import type { CSSProperties } from 'vue';
  import {
    defineComponent,
    ref,
    computed,
    watch,
    unref,
    nextTick,
    toRaw,
    getCurrentInstance,
    watch,
  } from 'vue';
  import { isFunction, isNumber } from '/@/utils/is';
  import { deepMerge } from '/@/utils';
  import DrawerFooter from './components/DrawerFooter.vue';
  import DrawerHeader from './components/DrawerHeader.vue';
  import { ScrollContainer } from '/@/components/Container';
  import { basicProps } from './props';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  import { ElDrawer } from 'element-plus';
  export default defineComponent({
    components: { ElDrawer, ScrollContainer, DrawerFooter, DrawerHeader },
    inheritAttrs: false,
    props: basicProps,
    emits: ['visible-change', 'ok', 'close', 'register'],
    setup(props, { emit }) {
      const visibleRef = ref(false);
      const attrs = useAttrs();

      const propsRef = ref<Partial<Nullable<DrawerProps>>>(null);

      // const { t } = useI18n();
      const { prefixVar, prefixCls } = useDesign('basic-drawer');

      const drawerInstance: DrawerInstance = {
        setDrawerProps: setDrawerProps,
        emitVisible: undefined,
      };

      const instance = getCurrentInstance();

      instance && emit('register', drawerInstance, instance.uid);

      const getMergeProps = computed((): DrawerProps => {
        return deepMerge(toRaw(props), unref(propsRef));
      });

      const getProps = computed(() => {
        const opt = {
          direction: 'rtl',
          title: undefined,
          ...unref(attrs),
          ...unref(getMergeProps),
          vModel: unref(visibleRef),
        };
        opt.title = undefined;
        const { isDetail, width, wrapClassName, getContainer } = opt;
        if (isDetail) {
          if (!width) {
            opt.width = '100%';
          }
          const detailCls = `${prefixCls}__detail`;
          opt.customClass = wrapClassName ? `${wrapClassName} ${detailCls}` : detailCls;

          if (!getContainer) {
            // TODO type error?
            opt.getContainer = `.${prefixVar}-layout-content` as any;
          }
        }
        return opt;
      });

      const getBindValues = computed(() => {
        return {
          // ...attrs,
          ...unref(getProps),
        };
      });

      // Custom implementation of the bottom button,
      const getFooterHeight = computed(() => {
        const { footerHeight, showFooter } = unref(getProps);
        if (showFooter && footerHeight) {
          return isNumber(footerHeight)
            ? `${footerHeight}px`
            : `${footerHeight.replace('px', '')}px`;
        }
        return `0px`;
      });

      const getScrollContentStyle = computed((): CSSProperties => {
        const footerHeight = unref(getFooterHeight);
        return {
          position: 'relative',
          height: `calc(100% - ${footerHeight})`,
        };
      });

      const getLoading = computed(() => {
        return !!unref(getProps)?.loading;
      });

      watch(
        () => props.visible,
        (newVal, oldVal) => {
          if (newVal !== oldVal) visibleRef.value = newVal;
        },
        { deep: true }
      );

      watch(
        () => visibleRef.value,
        (visible) => {
          nextTick(() => {
            emit('visible-change', visible);
            instance && drawerInstance.emitVisible?.(visible, instance.uid);
          });
        }
      );

      // Cancel event
      async function onClose(e: Recordable) {
        const { closeFunc } = unref(getProps);
        emit('close', e);
        if (closeFunc && isFunction(closeFunc)) {
          const res = await closeFunc();
          visibleRef.value = !res;
          return;
        }

        visibleRef.value = false;
      }

      function setDrawerProps(props: Partial<DrawerProps>): void {
        // Keep the last setDrawerProps
        propsRef.value = deepMerge(unref(propsRef) || ({} as any), props);
        console.log('props', props);

        if (Reflect.has(props, 'visible')) {
          visibleRef.value = !!props.visible;
        }
      }

      function handleOk() {
        emit('ok');
      }

      return {
        onClose,
        // t,
        prefixCls,
        getMergeProps: getMergeProps as any,
        getScrollContentStyle,
        getProps: getProps as any,
        getLoading,
        getBindValues,
        getFooterHeight,
        handleOk,
        visibleRef,
      };
    },
  });
</script>
<style lang="less">
  @header-height: 60px;
  @detail-header-height: 56px;
  @prefix-cls: ~'@{namespace}-basic-drawer';
  @prefix-cls-detail: ~'@{namespace}-basic-drawer__detail';

  .@{prefix-cls} {
    .IsBlle-basic-title {
      margin-left: 24px;
    }
    .el-drawer__close-btn {
      margin-right: 24px;
    }
    .el-button + .el-button {
      margin-left: 0;
    }

    svg {
      padding: 0;
      &:hover {
        color: @error-color;
      }
    }

    .el-drawer__body {
      height: calc(100% - @header-height);
      padding: 0;
      // background-color: @component-background;

      .scrollbar__wrap {
        padding: 16px !important;
        margin-bottom: 0 !important;
      }

      > .scrollbar > .scrollbar__bar.is-horizontal {
        display: none;
      }
    }
  }

  .@{prefix-cls-detail} {
    position: absolute;

    .el-drawer__header {
      width: 100%;
      height: @detail-header-height !important;
      padding: 0;
      border-top: 1px solid @border-color-base;
      box-sizing: border-box;
      margin-bottom: 0;
      // padding-left: 24px;
      // padding: 16px 24px;
    }

    #el-drawer__title {
      height: 100%;
    }

    .el-drawer__close {
      height: @detail-header-height;
      line-height: @detail-header-height;
    }

    .scrollbar__wrap {
      padding: 0 !important;
      box-sizing: border-box;
    }

    .el-drawer__body {
      height: calc(100% - @detail-header-height);
      font-size: 14px;
    }
  }
</style>
