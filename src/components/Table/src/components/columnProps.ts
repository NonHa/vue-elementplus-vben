import type { PropType } from 'vue';

import { BasicColumn } from '../types/table';
export const columnProps = {
  columns: {
    type: [Array] as PropType<BasicColumn[]>,
    default: () => [],
  },
};
