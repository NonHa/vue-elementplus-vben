<!--
 * @Author: your name
 * @Date: 2022-02-22 17:16:51
 * @LastEditTime: 2022-03-01 15:33:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\layouts\default\setting\components\SettingFooter.vue
-->
<template>
  <div :class="prefixCls">
    <a-button type="primary" block @click="handleCopy">
      <Coin class="mr-2" />
      {{ "layout.setting.copyBtn" }}
    </a-button>

    <a-button color="warning" block @click="handleResetSetting" class="my-3">
      <Reading class="mr-2" />
      {{ "common.resetText" }}
    </a-button>

    <a-button color="error" block @click="handleClearAndRedo">
      <Reading class="mr-2" />
      {{ "layout.setting.clearBtn" }}
    </a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, unref } from "vue";

import { Coin, Reading } from "@element-plus/icons-vue";

import { useAppStore } from "/@/store/modules/app";
import { usePermissionStore } from "/@/store/modules/permission";
import { useMultipleTabStore } from "/@/store/modules/multipleTab";
import { useUserStore } from "/@/store/modules/user";

import { useDesign } from "/@/hooks/web/useDesign";
// import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from "/@/hooks/web/useMessage";
import { useCopyToClipboard } from "/@/hooks/web/useCopyToClipboard";

import { updateColorWeak } from "/@/logics/theme/updateColorWeak";
import { updateGrayMode } from "/@/logics/theme/updateGrayMode";
import defaultSetting from "/@/settings/projectSetting";

export default defineComponent({
  name: "SettingFooter",
  components: { Coin, Reading },
  setup() {
    const permissionStore = usePermissionStore();
    const { prefixCls } = useDesign("setting-footer");
    // const { t } = useI18n();
    const { createSuccessModal, createMessage } = useMessage();
    const tabStore = useMultipleTabStore();
    const userStore = useUserStore();
    const appStore = useAppStore();

    function handleCopy() {
      const { isSuccessRef } = useCopyToClipboard(
        JSON.stringify(unref(appStore.getProjectConfig), null, 2)
      );
      unref(isSuccessRef) &&
        createSuccessModal({
          title: "layout.setting.operatingTitle",
          message: "layout.setting.operatingContent",
        });
    }
    function handleResetSetting() {
      try {
        appStore.setProjectConfig(defaultSetting);
        const { colorWeak, grayMode } = defaultSetting;
        // updateTheme(themeColor);
        updateColorWeak(colorWeak);
        updateGrayMode(grayMode);
        createMessage.success("layout.setting.resetSuccess");
      } catch (error: any) {
        createMessage.error(error);
      }
    }

    function handleClearAndRedo() {
      localStorage.clear();
      appStore.resetAllState();
      permissionStore.resetState();
      tabStore.resetState();
      userStore.resetState();
      location.reload();
    }
    return {
      prefixCls,
      // t,
      handleCopy,
      handleResetSetting,
      handleClearAndRedo,
    };
  },
});
</script>
<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-setting-footer";

.@{prefix-cls} {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
