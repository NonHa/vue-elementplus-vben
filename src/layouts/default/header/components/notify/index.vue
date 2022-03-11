<!--
 * @Author: your name
 * @Date: 2022-02-25 10:24:57
 * @LastEditTime: 2022-03-04 14:48:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\layouts\default\header\components\notify\index.vue
-->
<template>
  <div :class="prefixCls">
    <ElPopover title="" trigger="click" :popper-class="`${prefixCls}__overlay`">
      <template>
        <ElTabs>
          <template v-for="item in listData" :key="item.key">
            <ElTabPane>
              <template #tab>
                {{ item.name }}
                <span v-if="item.list.length !== 0">({{ item.list.length }})</span>
              </template>
              <!-- 绑定title-click事件的通知列表中标题是“可点击”的-->
              <NoticeList
                :list="item.list"
                v-if="item.key === '1'"
                @title-click="onNoticeClick"
              />
              <NoticeList :list="item.list" v-else />
            </ElTabPane>
          </template>
        </ElTabs>
      </template>
      <template #reference>
        <ElBadge :count="count" dot :numberStyle="numberStyle">
          <Bell />
        </ElBadge>
      </template>
    </ElPopover>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { ElPopover, ElTabs, ElBadge, ElTabPane } from "element-plus";
import { Bell } from "@element-plus/icons-vue";
import { tabListData, ListItem } from "./data";
import NoticeList from "./NoticeList.vue";
import { useDesign } from "/@/hooks/web/useDesign";
import { useMessage } from "/@/hooks/web/useMessage";

export default defineComponent({
  components: { ElPopover, Bell, ElTabs, ElTabPane, ElBadge, NoticeList },
  setup() {
    const { prefixCls } = useDesign("header-notify");
    const { createMessage } = useMessage();
    const listData = ref(tabListData);

    const count = computed(() => {
      let count = 0;
      for (let i = 0; i < tabListData.length; i++) {
        count += tabListData[i].list.length;
      }
      return count;
    });

    function onNoticeClick(record: ListItem) {
      createMessage.success("你点击了通知，ID=" + record.id);
      // 可以直接将其标记为已读（为标题添加删除线）,此处演示的代码会切换删除线状态
      record.titleDelete = !record.titleDelete;
    }

    return {
      prefixCls,
      listData,
      count,
      onNoticeClick,
      numberStyle: {},
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~"@{namespace}-header-notify";

.@{prefix-cls} {
  padding-top: 2px;

  &__overlay {
    max-width: 360px;
  }

  .ant-tabs-content {
    width: 300px;
  }

  .ant-badge {
    font-size: 18px;

    .ant-badge-multiple-words {
      padding: 0 4px;
    }

    svg {
      width: 0.9em;
    }
  }
}
</style>
