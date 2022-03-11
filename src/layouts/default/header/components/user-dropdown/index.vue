<template>
  <ElDropdown placement="bottom" :popper-class="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <img :class="`${prefixCls}__header`" :src="getUserInfo?.avatar" />
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name  `" class="truncate">
          {{ getUserInfo?.realName }}
        </span>
      </span>
    </span>

    <template #dropdown>
      <ElMenu @select="handleMenuClick">
        <DropMenuItem
          key="doc"
          text="dropdownItemDoc"
          icon="ion:document-text-outline"
          v-if="getShowDoc"
        />
        <!-- <MenuDivider v-if="getShowDoc" /> -->
        <DropMenuItem
          v-if="getUseLockPage"
          key="lock"
          text="tooltipLock"
          icon="ion:lock-closed-outline"
        />
        <DropMenuItem key="logout" text="dropdownItemLoginOut" icon="ion:power-outline" />
      </ElMenu>
    </template>
  </ElDropdown>
  <LockAction @register="register" />
</template>
<script lang="ts">
// components
import { ElDropdown, ElMenu } from "element-plus";

import { defineComponent, computed } from "vue";

import { DOC_URL } from "/@/settings/siteSetting";

import { useUserStore } from "/@/store/modules/user";
import { useHeaderSetting } from "/@/hooks/setting/useHeaderSetting";
// import { useI18n } from '/@/hooks/web/useI18n';
import { useDesign } from "/@/hooks/web/useDesign";
import { useModal } from "/@/components/Modal";

import headerImg from "/@/assets/images/header.jpg";
import { propTypes } from "/@/utils/propTypes";
import { openWindow } from "/@/utils";

import { createAsyncComponent } from "/@/utils/factory/createAsyncComponent";

// type MenuEvent = "logout" | "doc" | "lock";

export default defineComponent({
  name: "UserDropdown",
  components: {
    ElDropdown,
    ElMenu,
    DropMenuItem: createAsyncComponent(() => import("./DropMenuItem.vue")),
    // MenuDivider: ElMenu.Divider,
    LockAction: createAsyncComponent(() => import("../lock/LockModal.vue")),
  },
  props: {
    theme: propTypes.oneOf(["dark", "light"]),
  },
  setup() {
    const { prefixCls } = useDesign("header-user-dropdown");
    // const { t } = useI18n();
    const { getShowDoc, getUseLockPage } = useHeaderSetting();
    const userStore = useUserStore();
    const getUserInfo = computed(() => {
      const { realName = "", avatar, desc } = userStore.getUserInfo || {};
      return { realName, avatar: avatar || headerImg, desc };
    });
    const [register, { openModal }] = useModal();
    function handleLock() {
      openModal(true);
    }
    //  login out
    function handleLoginOut() {
      userStore.confirmLoginOut();
    }
    // open doc
    function openDoc() {
      openWindow(DOC_URL);
    }
    function handleMenuClick(e) {
      switch (e.key) {
        case "logout":
          handleLoginOut();
          break;
        case "doc":
          openDoc();
          break;
        case "lock":
          handleLock();
          break;
      }
    }
    return {
      prefixCls,
      // t,
      getUserInfo,
      handleMenuClick,
      getShowDoc,
      register,
      getUseLockPage,
    };
    return {};
  },
});
</script>
<style lang="less">
@prefix-cls: ~"@{namespace}-header-user-dropdown";

.@{prefix-cls} {
  height: @header-height;
  padding: 0 0 0 10px;
  padding-right: 10px;
  overflow: hidden;
  font-size: 12px;
  cursor: pointer;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }

  &__header {
    border-radius: 50%;
  }

  &__name {
    font-size: 14px;
  }

  &--dark {
    &:hover {
      background-color: @header-dark-bg-hover-color;
    }
  }

  &--light {
    &:hover {
      background-color: @header-light-bg-hover-color;
    }

    .@{prefix-cls}__name {
      color: @text-color-base;
    }

    .@{prefix-cls}__desc {
      color: @header-light-desc-color;
    }
  }

  &-dropdown-overlay {
    .ant-dropdown-menu-item {
      min-width: 160px;
    }
  }
}
</style>
