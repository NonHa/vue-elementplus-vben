<template>
  <ElDescriptions :class="prefixCls" bordered :pagination="getPagination">
    <ElDescriptionsItem
      v-for="item in getData"
      :key="item.id"
      class="list-item"
      label="Username"
    >
      <!-- <div>
        <template #title>
          <div class="title">
            <div
              @click="handleTitleClick(item)"
              style="width: 100%; margin-bottom: 0 !important"
              :style="{ cursor: isTitleClickable ? 'pointer' : '' }"
              :delete="!!item.titleDelete"
              :ellipsis="
                $props.titleRows && $props.titleRows > 0
                  ? { rows: $props.titleRows, tooltip: !!item.title }
                  : false
              "
              :content="item.title"
            />
            <div class="extra" v-if="item.extra">
              <ElTag class="tag" :color="item.color">
                {{ item.extra }}
              </ElTag>
            </div>
          </div>
        </template>

        <template #avatar>
          <ElAvatar v-if="item.avatar" class="avatar" :src="item.avatar" />
          <span v-else> {{ item.avatar }}</span>
        </template>

        <template #description>
          <div>
            <div class="description" v-if="item.description">
              <div
                style="width: 100%; margin-bottom: 0 !important"
                :ellipsis="
                  $props.descRows && $props.descRows > 0
                    ? { rows: $props.descRows, tooltip: !!item.description }
                    : false
                "
                :content="item.description"
              />
            </div>
            <div class="datetime">
              {{ item.datetime }}
            </div>
          </div>
        </template>
      </div> -->
    </ElDescriptionsItem>
  </ElDescriptions>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref, watch, unref } from "vue";
import { ListItem } from "./data";
import { useDesign } from "/@/hooks/web/useDesign";
import { ElDescriptions, ElDescriptionsItem, ElAvatar, ElTag } from "element-plus";
import { isNumber } from "/@/utils/is";
export default defineComponent({
  components: {
    ElAvatar,
    ElDescriptions,
    ElDescriptionsItem,

    ElTag,
  },
  props: {
    list: {
      type: Array as PropType<ListItem[]>,
      default: () => [],
    },
    pageSize: {
      type: [Boolean, Number] as PropType<Boolean | Number>,
      default: 5,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    titleRows: {
      type: Number,
      default: 1,
    },
    descRows: {
      type: Number,
      default: 2,
    },
    onTitleClick: {
      type: Function as PropType<(Recordable) => void>,
    },
  },
  emits: ["update:currentPage"],
  setup(props, { emit }) {
    const { prefixCls } = useDesign("header-notify-list");
    const current = ref(props.currentPage || 1);
    const getData = computed(() => {
      const { pageSize, list } = props;
      if (pageSize === false) return [];
      let size = isNumber(pageSize) ? pageSize : 5;
      return list.slice(size * (unref(current) - 1), size * unref(current));
    });
    watch(
      () => props.currentPage,
      (v) => {
        current.value = v;
      }
    );
    const isTitleClickable = computed(() => !!props.onTitleClick);
    const getPagination = computed(() => {
      const { list, pageSize } = props;
      if (pageSize > 0 && list && list.length > pageSize) {
        return {
          total: list.length,
          pageSize,
          //size: 'small',
          current: unref(current),
          onChange(page) {
            current.value = page;
            emit("update:currentPage", page);
          },
        };
      } else {
        return false;
      }
    });

    function handleTitleClick(item: ListItem) {
      props.onTitleClick && props.onTitleClick(item);
    }

    return { prefixCls, getPagination, getData, handleTitleClick, isTitleClickable };
  },
});
</script>
<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-header-notify-list";

.@{prefix-cls} {
  &::-webkit-scrollbar {
    display: none;
  }

  ::v-deep(.ant-pagination-disabled) {
    display: inline-block !important;
  }

  &-item {
    padding: 6px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s;

    .title {
      margin-bottom: 8px;
      font-weight: normal;

      .extra {
        float: right;
        margin-top: -1.5px;
        margin-right: 0;
        font-weight: normal;

        .tag {
          margin-right: 0;
        }
      }

      .avatar {
        margin-top: 4px;
      }

      .description {
        font-size: 12px;
        line-height: 18px;
      }

      .datetime {
        margin-top: 4px;
        font-size: 12px;
        line-height: 18px;
      }
    }
  }
}
</style>
