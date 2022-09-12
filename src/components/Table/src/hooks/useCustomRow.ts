import type { ComputedRef } from 'vue';
import type { BasicTableProps } from '../types/table';
import { unref } from 'vue';
import { ROW_KEY } from '../const';
import { isString, isFunction } from '/@/utils/is';

interface Options {
  setSelectedRowKeys: (keys: string[]) => void;
  getSelectRowKeys: () => string[];
  clearSelectedRowKeys: () => void;
  emit: EmitType;
  getAutoCreateKey: ComputedRef<boolean | undefined>;
  cancelSelectRow: (key: string | number, rowKey: string | number) => void;
}

function getKey(
  record: Recordable,
  rowKey: string | ((record: Record<string, any>) => string) | undefined,
  autoCreateKey?: boolean
) {
  if (!rowKey || autoCreateKey) {
    return record[ROW_KEY];
  }
  if (isString(rowKey)) {
    return record[rowKey];
  }
  if (isFunction(rowKey)) {
    return record[rowKey(record)];
  }
  return null;
}

export function useCustomRow(
  propsRef: ComputedRef<BasicTableProps>,
  {
    setSelectedRowKeys,
    getSelectRowKeys,
    getAutoCreateKey,
    clearSelectedRowKeys,
    emit,
    cancelSelectRow,
  }: Options
) {
  // const customRow = (record: Recordable, index: number) => {
  return {
    onRowClick: (row, column, event) => {
      event?.stopPropagation();

      function handleClick() {
        const { rowSelection, rowKey, clickToRowSelect } = unref(propsRef);
        if (!rowSelection || !clickToRowSelect) return;
        const keys = getSelectRowKeys();
        const key = getKey(row, rowKey, unref(getAutoCreateKey));
        if (!key) return;

        const isCheckbox = rowSelection.type === 'checkbox';
        if (isCheckbox) {
          // 找到tr
          // 获取事件冒泡路径 array composedPath

          const tr: HTMLElement = (event as MouseEvent)
            .composedPath?.()
            .find((dom: HTMLElement) => dom.tagName === 'TR') as HTMLElement;

          if (!tr) return;
          // 找到Checkbox，检查是否为disabled
          const checkBox = tr.querySelector('input[type=checkbox]');
          if (!checkBox || checkBox.hasAttribute('disabled')) return;
          if (!keys.includes(key)) {
            setSelectedRowKeys([...keys, key]);
            return;
          }

          cancelSelectRow(key, rowKey as string | number);
          return;
        }

        // const isRadio = rowSelection.type === 'radio';
        // if (isRadio) {
        //   if (!keys.includes(key)) {
        //     if (keys.length) {
        //       clearSelectedRowKeys();
        //     }
        //     setSelectedRowKeys([key]);
        //     return;
        //   }
        //   clearSelectedRowKeys();
        // }
      }
      handleClick();
      emit('row-click', row, column.index, event);
    },
    onRowDblclick: (row, column, event: Event) => {
      emit('row-dbClick', row, column.index, event);
    },
    onRowContextmenu: (row, column, event: Event) => {
      emit('row-contextmenu', row, column.index, event);
    },
    onCellMouseenter: (row, column, cell, event: Event) => {
      emit('cell-mouse-enter', row, column, cell, event);
    },
    onCellMouseleave: (row, column, cell, event: Event) => {
      emit('cell-mouse-leave', row, column, cell, event);
    },
  };
  // };

  // return {
  //   customRow,
  // };
}
