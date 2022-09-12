import { unref } from 'vue';
export function setBaseTableFormatter(row, field, column) {
  const { mapList } = unref(column);

  const item = mapList.filter((v) => v.field === unref(row)[unref(field)]);

  return item && item.length > 0 ? item[0].title : '';
}
