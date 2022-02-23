/*
 * @Author: your name
 * @Date: 2022-01-25 14:23:42
 * @LastEditTime: 2022-01-25 14:23:56
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\components\Table\index.ts
 */
export { default as BasicTable } from './src/BasicTable.vue';
export { default as TableAction } from './src/components/TableAction.vue';
export { default as EditTableHeaderIcon } from './src/components/EditTableHeaderIcon.vue';
export { default as TableImg } from './src/components/TableImg.vue';

export * from './src/types/table';
export * from './src/types/pagination';
export * from './src/types/tableAction';
export { useTable } from './src/hooks/useTable';
// export type { FormSchema, FormProps } from '/@/components/Form/src/types/form';
export type { EditRecordRow } from './src/components/editable';
