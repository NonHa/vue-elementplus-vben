// import type { PaginationProps } from '../types/pagination';
import type { BasicTableProps } from '../types/table';
import { computed, unref, ref, ComputedRef, watch } from 'vue';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import { isBoolean } from '/@/utils/is';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../const';
// import { useI18n } from '/@/hooks/web/useI18n';
import type { PaginationProps } from 'element-plus/lib/components/pagination/src/pagination';

interface ItemRender {
  page: number;
  type: 'page' | 'prev' | 'next';
  originalElement: any;
}

function itemRender({ page, type, originalElement }: ItemRender) {
  if (type === 'prev') {
    return page === 0 ? null : <ArrowLeft />;
  } else if (type === 'next') {
    return page === 1 ? null : <ArrowRight />;
  }
  return originalElement;
}

export function usePagination(refProps: ComputedRef<BasicTableProps>, pagiantion = {}) {
  // const { t } = useI18n();

  const configRef = ref<Partial<PaginationProps>>({
    pagerCount: 11,
    layout: 'prev, pager, next,jumper,total,sizes',
    pageSizes: PAGE_SIZE_OPTIONS,
    popperClass: '',
    // prevText: '',
    // nextText: '',
    small: true,
    background: true,
    disabled: false,
    hideOnSinglePage: false
  });
  const show = ref(true);

  watch(
    () => pagiantion,
    (pagination) => {
      if (!isBoolean(pagination) && pagination) {
        configRef.value = {
          ...unref(configRef),
          ...(pagination ?? {})
        };
      }
    },
    {
      deep: true
    }
  );

  const getPaginationInfo = computed((): Partial<PaginationProps> => {
    // const { pagination } = unref(refProps);

    // if (!unref(show) || (isBoolean(pagination) && !pagination)) {
    //   return false;
    // }

    return {
      currentPage: 1,
      pageSize: PAGE_SIZE,
      // size: 'small',
      defaultPageSize: PAGE_SIZE,
      // showTotal: (total) => 'component.table.total',
      // showSizeChanger: true,
      // pageSizeOptions: PAGE_SIZE_OPTIONS,
      // itemRender: itemRender,
      // showQuickJumper: true,
      total: 0,
      ...pagiantion,
      ...unref(configRef)
    };
  });

  function setPagination(info: Partial<PaginationProps>) {
    const paginationInfo = unref(getPaginationInfo);
    configRef.value = {
      ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
      ...info
    };
  }

  function getPagination() {
    return unref(getPaginationInfo);
  }

  function getShowPagination() {
    return unref(show);
  }

  async function setShowPagination(flag: boolean) {
    show.value = flag;
  }

  return { getPagination, getPaginationInfo, setShowPagination, getShowPagination, setPagination };
}
