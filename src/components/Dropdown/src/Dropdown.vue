<!--
 * @Author: your name
 * @Date: 2022-02-22 17:19:33
 * @LastEditTime: 2022-02-24 16:32:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\components\Dropdown\src\Dropdown.vue
-->
<template>
  <ElDropdown :trigger="trigger" v-bind="$attrs">
    <span>
      <slot></slot>
    </span>
    <template #overlay>
      <ElMenu :selectedKeys="selectedKeys">
        <template v-for="item in dropMenuList" :key="`${item.event}`">
          <ElMenuItem
            v-bind="getAttr(item.event)"
            @click="handleClickMenu(item)"
            :disabled="item.disabled"
          >
            <ElPopconfirm
              v-if="popconfirm && item.popConfirm"
              v-bind="getPopConfirmAttrs(item.popConfirm)"
            >
              <template #icon v-if="item.popConfirm.icon">
                <Icon :icon="item.popConfirm.icon" />
              </template>
              <div>
                <Icon :icon="item.icon" v-if="item.icon" />
                <span class="ml-1">{{ item.text }}</span>
              </div>
            </ElPopconfirm>
            <template v-else>
              <Icon :icon="item.icon" v-if="item.icon" />
              <span class="ml-1">{{ item.text }}</span>
            </template>
          </ElMenuItem>
          <!-- <ElMenuDivider v-if="item.divider" :key="`d-${item.event}`" /> -->
        </template>
      </ElMenu>
    </template>
  </ElDropdown>
</template>

<script lang="ts" setup>
  import { computed, PropType } from 'vue';
  import type { DropMenu } from './typing';
  import { Icon } from '/@/components/Icon';
  import { omit } from 'lodash-es';
  import { isFunction } from '/@/utils/is';
  import { ElDropdown, ElMenu, ElMenuItem, ElPopconfirm } from 'element-plus';

  const props = defineProps({
    popconfirm: Boolean,
    /**
     * the trigger mode which executes the drop-down action
     * @default ['hover']
     * @type string[]
     */
    trigger: {
      type: [Array] as PropType<('contextmenu' | 'click' | 'hover')[]>,
      default: () => {
        return ['contextmenu'];
      },
    },
    dropMenuList: {
      type: Array as PropType<(DropMenu & Recordable)[]>,
      default: () => [],
    },
    selectedKeys: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  });

  const emit = defineEmits(['menuEvent']);

  function handleClickMenu(item: DropMenu) {
    const { event } = item;
    const menu = props.dropMenuList.find((item) => `${item.event}` === `${event}`);
    emit('menuEvent', menu);
    item.onClick?.();
  }

  const getPopConfirmAttrs = computed(() => {
    return (attrs) => {
      const originAttrs = omit(attrs, ['confirm', 'cancel', 'icon']);
      if (!attrs.onConfirm && attrs.confirm && isFunction(attrs.confirm))
        originAttrs['onConfirm'] = attrs.confirm;
      if (!attrs.onCancel && attrs.cancel && isFunction(attrs.cancel))
        originAttrs['onCancel'] = attrs.cancel;
      return originAttrs;
    };
  });

  const getAttr = (key: string | number) => ({ key });
</script>
