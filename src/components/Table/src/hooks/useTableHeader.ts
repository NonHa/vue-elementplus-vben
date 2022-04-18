import type { ComputedRef, Slots } from 'vue';
import type { BasicTableProps, InnerHandlers } from '../types/table';
import { unref, computed, h } from 'vue';
import TableHeader from '../components/TableHeader.vue';
import { isString } from '/@/utils/is';
import { getSlot } from '/@/utils/helper/tsxHelper';

export function useTableHeader(propsRef: ComputedRef<BasicTableProps>) {
  const { slots, title, showTableSetting, titleHelpMessage, tableSetting } = unref(propsRef);

  // const hideTitle = !slots.tableTitle && !title && !slots.toolbar && !showTableSetting;
  // console.log('hideTitle----', slots);
  // let slots = attrs.slots;
  // console.log('attrs----', attrs);
  console.log('hideTitle----', slots);
  // if (hideTitle && !isString(title)) {
  //   return {};
  // }

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

  //  computed((): Recordable => {
  //   const { title, showTableSetting, titleHelpMessage, tableSetting } = unref(propsRef);

  //   const hideTitle = !slots.tableTitle && !title && !slots.toolbar && !showTableSetting;

  //   if (hideTitle && !isString(title)) {
  //     return {};
  //   }

  //   return {
  //     title: hideTitle
  //       ? null
  //       : () =>
  //           h(
  //             TableHeader,
  //             {
  //               title,
  //               titleHelpMessage,
  //               showTableSetting,
  //               tableSetting,
  //               onColumnsChange: handlers.onColumnsChange,
  //             } as Recordable,
  //             {
  //               ...(slots.toolbar
  //                 ? {
  //                     toolbar: () => getSlot(slots, 'toolbar'),
  //                   }
  //                 : {}),
  //               ...(slots.tableTitle
  //                 ? {
  //                     tableTitle: () => getSlot(slots, 'tableTitle'),
  //                   }
  //                 : {}),
  //               ...(slots.headerTop
  //                 ? {
  //                     headerTop: () => getSlot(slots, 'headerTop'),
  //                   }
  //                 : {}),
  //             }
  //           ),
  //   };
  // });
  // return { getHeaderProps };
}
