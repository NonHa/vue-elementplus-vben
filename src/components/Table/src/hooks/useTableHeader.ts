import type { ComputedRef, Slots } from 'vue';
import type { BasicTableProps, InnerHandlers } from '../types/table';
import { unref, computed, h } from 'vue';
import TableHeader from '../components/TableHeader.vue';
import { isString } from '/@/utils/is';
import { getSlot } from '/@/utils/helper/tsxHelper';

export function useTableHeader(propsRef) {
  const { slots, title, showTableSetting, titleHelpMessage, tableSetting } = unref(propsRef);

  return h(
    TableHeader,
    {
      title,
      titleHelpMessage,
      showTableSetting,
      tableSetting,
      // onColumnsChange: handlers.onColumnsChange,
    } as Recordable,
    {
      ...(slots.toolbar
        ? {
            toolbar: () => getSlot(slots, 'toolbar'),
          }
        : {}),
      ...(slots.tableTitle
        ? {
            tableTitle: () => getSlot(slots, 'tableTitle'),
          }
        : {}),
      ...(slots.headerTop
        ? {
            headerTop: () => getSlot(slots, 'headerTop'),
          }
        : {}),
    }
  );
}
