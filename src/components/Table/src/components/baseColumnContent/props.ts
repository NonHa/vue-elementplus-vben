import type { PropType } from 'vue';
import type { ComponentType } from '/@/components/Form/src/types/index';
import { BasicColumn } from '/@/components/Table/src/types/table';

type Row = {
  type?: ComponentType | 'text';
};
export const columnProps = {
  row: {
    type: Object as PropType<Row>,
    default: {},
  },
  column: {
    type: Object as PropType<BasicColumn>,
    default: {},
  },
  field: {
    type: String,
    default: '',
  },
};
