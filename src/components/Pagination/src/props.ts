import { paginationProps } from 'element-plus/lib/components/pagination/src/pagination';

export const PaginationProps = {
  ...paginationProps,
  page: {
    type: Number,
  },
  limit: {
    type: Number,
  },
};
