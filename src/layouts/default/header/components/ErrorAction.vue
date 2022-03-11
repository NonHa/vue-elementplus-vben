<template>
  <ElTooltip
    title="tooltipErrorLog"
    placement="bottom"
    :mouseEnterDelay="0.5"
    @click="handleToErrorList"
  >
    <ElBadge is-dot>
      <Icon icon="ion:bug-outline" />
    </ElBadge>
  </ElTooltip>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { ElTooltip, ElBadge } from "element-plus";
import Icon from "/@/components/Icon";

// import { useI18n } from '/@/hooks/web/useI18n';
import { useErrorLogStore } from "/@/store/modules/errorLog";
import { PageEnum } from "/@/enums/pageEnum";

import { useRouter } from "vue-router";

export default defineComponent({
  name: "ErrorAction",
  components: { Icon, ElTooltip, ElBadge },

  setup() {
    // const { t } = useI18n();
    const { push } = useRouter();
    const errorLogStore = useErrorLogStore();

    const getCount = computed(() => errorLogStore.getErrorLogListCount);

    function handleToErrorList() {
      push(PageEnum.ERROR_LOG_PAGE).then(() => {
        errorLogStore.setErrorLogListCount(0);
      });
    }

    return {
      getCount,
      handleToErrorList,
    };
  },
});
</script>
