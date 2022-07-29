<script lang="tsx">
import { defineComponent, CSSProperties, watch, nextTick } from 'vue';
import { fileListProps } from './props';
import { isFunction } from '/@/utils/is';
import { useModalContext } from '/@/components/Modal/src/hooks/useModalContext';

export default defineComponent({
  name: 'FileList',
  props: fileListProps,
  setup(props) {
    const modalFn = useModalContext();
    watch(
      () => props.dataSource,
      () => {
        nextTick(() => {
          modalFn?.redoModalHeight?.();
        });
      }
    );
    return () => {
      const { columns, actionColumn, dataSource } = props;
      const columnList = [...columns, actionColumn];
      return (
        <table class="file-table">
          <colgroup>
            {columnList.map((item) => {
              const { width = 0, columnKey } = item;
              const style: CSSProperties = {
                width: `${width}px`,
                minWidth: `${width}px`
              };
              return <col style={width ? style : {}} key={columnKey} />;
            })}
          </colgroup>
          <thead>
            <tr class="file-table-tr">
              {columnList.map((item) => {
                const { label = '', align = 'center', columnKey } = item;
                return (
                  <th class={['file-table-th', align]} key={columnKey}>
                    {label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {dataSource.map((record = {}, index) => {
              return (
                <tr class="file-table-tr" key={`${index + record.name || ''}`}>
                  {columnList.map((item) => {
                    const { columnKey = '', formatter, align = 'center' } = item;
                    const render = formatter && isFunction(formatter);
                    return (
                      <td class={['file-table-td', align]} key={columnKey}>
                        {render
                          ? formatter?.({ text: record[columnKey], record })
                          : record[columnKey]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    };
  }
});
</script>
<style lang="less">
.file-table {
  width: 100%;
  border-collapse: collapse;

  .center {
    text-align: center;
  }

  .left {
    text-align: left;
  }

  .right {
    text-align: right;
  }

  &-th,
  &-td {
    padding: 8px;
  }

  thead {
    background-color: @background-color-light;
  }

  table,
  td,
  th {
    border: 1px solid @border-color-base;
  }
}
</style>
