import { FormProps, FormSchema } from '/@/components/Form/src/types/form';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { ElRadioGroup, ElRadio, ElDatePicker } from 'element-plus';
import { BasicUpload } from '/@/components/Upload';
import { setBaseTableFormatter } from '/@/hooks/event/useTableFomatter';
import CoupEidtType from './coupEidtType.vue';
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      label: '编号',
      prop: 'id',
      fixed: 'left'
    },
    {
      label: '活动标题',
      prop: 'title',
      width: 150
    },
    {
      label: '活动状态',
      prop: 'status',
      width: 150
    },
    {
      label: '开始时间',
      prop: 'startDate'
    },
    {
      label: '结束时间',
      prop: 'endDate'
    },

    {
      label: '上线/下线',
      prop: 'status',
      slot: true
    },

    {
      label: '操作',
      prop: 'operate',
      slot: true,
      width: 250
    }
  ];
}
export function getTimeColumns(show): BasicColumn[] {
  console.log('show', show);
  const showItem = show
    ? {
        label: '商品数量',
        prop: 'status',
        slot: true,
        ifShow: show
      }
    : {
        label: '启用',
        prop: 'status',
        slot: true,
        ifShow: !show
      };
  return [
    {
      label: '编号',
      prop: 'id',
      fixed: 'left'
    },
    {
      label: '秒杀时间段名称',
      prop: 'name'
    },

    {
      label: '每日开始时间',
      prop: 'startTime'
    },
    {
      label: '每日结束时间',
      prop: 'endTime'
    },

    showItem,

    {
      label: '操作',
      prop: 'operate',
      slot: true,
      width: 250
    }
  ];
}
export function getPromotionProductColumns(): BasicColumn[] {
  return [
    {
      label: '编号',
      prop: 'id',
      fixed: 'left',
      width: 200
    },
    {
      label: '商品名称',
      prop: 'name',
      width: 150
    },
    {
      label: '货号',
      prop: 'productSn'
    },
    {
      label: '商品价格',
      prop: 'price'
    },
    {
      label: '剩余次数',
      prop: 'stock'
    },
    {
      label: '秒杀价格',
      prop: 'flashPromotionPrice'
    },
    {
      label: '秒杀数量',
      prop: 'flashPromotionCount'
    },
    {
      label: '限购数量',
      prop: 'flashPromotionLimit'
    },
    {
      label: '排序',
      prop: 'sort'
    },
    {
      label: '操作',
      prop: 'oprate',
      width: '160px',
      slot: true
    }
  ];
}

export function getSetProductColumns(): BasicColumn[] {
  return [
    {
      label: '商品名称',
      prop: 'name',
      width: 150
    },
    {
      label: '货号',
      prop: 'productSn'
    },
    {
      label: '商品价格',
      prop: 'price'
    }
  ];
}
export const coupTypeList = [
  {
    title: '全场赠券',
    field: 0
  },
  {
    title: '会员赠券',
    field: 1
  },
  {
    title: '购物赠券',
    field: 2
  },
  {
    title: '注册赠券',
    field: 3
  }
];
export function getCoupColumns(): BasicColumn[] {
  return [
    {
      label: '优惠券名称',
      prop: 'name',
      width: 150
    },
    {
      label: '优惠券类型',
      prop: 'type',
      // 优惠券类型；0->全场赠券；1->会员赠券；2->购物赠券；3->注册赠券
      mapList: coupTypeList,
      formatter: setBaseTableFormatter
    },
    {
      label: '可使用商品',
      prop: 'useType',
      // 0->全场通用；1->指定分类；2->指定商品
      mapList: [
        {
          title: '全场通用',
          field: 0
        },
        {
          title: '指定分类',
          field: 1
        },
        {
          title: '指定商品',
          field: 2
        }
      ],
      formatter: setBaseTableFormatter
    },
    {
      label: '使用门槛',
      prop: 'minPoint',
      formatter: (row, field) => {
        return `满${row.value.minPoint}元可用`;
      }
    },
    {
      label: '面值',
      prop: 'amount'
    },
    {
      label: '适用平台',
      prop: 'platform',
      // ：0->全部；1->移动；2->PC
      mapList: plates,
      formatter: setBaseTableFormatter
    },
    {
      label: '有效期',
      prop: 'enableTime',
      formatter: (row, field) => {
        return `${row.value.startTime}至${row.value.endTime}`;
      }
    },
    {
      label: '状态',
      prop: 'status',
      formatter: (row, field) => {
        return new Date(row.value.enableTime).getTime() < new Date().getTime()
          ? '已过期'
          : '未过期';
      }
    },
    {
      label: '操作',
      prop: 'operate',
      slot: true,
      width: 240
    }
  ];
}
export function getResourceColumns(): BasicColumn[] {
  return [
    {
      label: '编号',
      prop: 'id',
      fixed: 'left'
    },
    {
      label: '资源名称',
      prop: 'name',
      width: 150
    },
    {
      label: '资源路径',
      prop: 'url',
      width: 150
    },
    {
      label: '描述',
      prop: 'description'
    },
    {
      label: '添加时间',
      prop: 'createTime',
      width: '160px'
    },

    {
      label: '操作',
      prop: 'operate',
      slot: true,
      width: 200
    }
  ];
}
export const getAdvanceSchema = (): FormSchema[] => {
  return [
    {
      field: `name`,
      label: `优惠券名称`,
      component: 'ElInput',
      colProps: {
        xl: 24,
        lg: 24
      }
    },
    {
      field: `type`,
      label: `优惠券类型`,
      component: 'ElSelect',
      colProps: {
        xl: 24,
        lg: 24
      },
      searchList: coupTypeList
    }
  ];
};
export const getEditMenuSchema = (list): FormSchema[] => {
  return [
    {
      field: `title`,
      label: `菜单名称`,
      component: 'ElInput',
      colProps: {
        xl: 24,
        lg: 24
      }
    },
    {
      field: `parentId`,
      label: `上级分类`,
      component: 'ElSelect',
      colProps: colPropsCommon,
      searchList: list.length > 0 ? list : []
      // itemProps: itemPropsCommon
    },
    {
      field: `name`,
      label: `前端名称`,
      component: 'ElInput',
      colProps: {
        xl: 24,
        lg: 24
      }
    },
    {
      field: `sort`,
      label: `排序`,
      component: 'ElInput',
      colProps: {
        xl: 24,
        lg: 24
      }
    },

    {
      field: `hidden`,
      label: `是否展示`,
      component: 'ElSelect',
      colProps: {
        xl: 24,
        lg: 24
      },
      render: (getValues, formModel) => {
        return (
          <ElRadioGroup v-model={formModel.hidden}>
            <ElRadio label={0} size="large">
              是
            </ElRadio>
            <ElRadio label={1} size="large">
              否
            </ElRadio>
          </ElRadioGroup>
        );
      }
    }
  ];
};
export const getcategoryCateSchema = (list): FormSchema[] => {
  return [
    {
      field: `name`,
      label: `资源名称`,
      component: 'ElInput',
      colProps: {
        xl: 24,
        lg: 24
      }
    },
    {
      field: `url`,
      label: `资源路径`,
      component: 'ElInput',
      colProps: {
        xl: 24,
        lg: 24
      }
    },
    {
      field: `categoryId`,
      label: `资源分类`,
      component: 'ElSelect',
      colProps: colPropsCommon,
      searchList: list.length > 0 ? list : []
      // itemProps: itemPropsCommon
    },
    {
      field: `description`,
      label: `描述`,
      component: 'ElInputTextArea',
      colProps: {
        xl: 24,
        lg: 24
      }
    }
  ];
};
export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [...getAdvanceSchema()]
  };
}
export function getCoupFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `id`,
        label: `编号`,
        component: 'ElInput',
        colProps: {
          xl: 8,
          lg: 12
        }
      }
    ]
  };
}
export function getReturnApplyFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `id`,
        label: `编号`,
        component: 'ElInput',
        colProps: {
          xl: 8,
          lg: 12
        }
      },
      {
        field: `status`,
        label: `处理状态`,
        component: 'ElInput',
        colProps: {
          xl: 8,
          lg: 12
        },
        searchList: [
          {
            title: '待处理',
            field: 0
          },
          {
            title: '退货中',
            field: 1
          },
          {
            title: '已完成',
            field: 2
          },
          {
            title: '已拒绝',
            field: 3
          }
        ]
      },
      {
        field: `createTime`,
        label: `申请时间`,
        component: 'ElDatePicker',
        colProps: {
          xl: 8,
          lg: 12
        },
        componentProps: {
          valueFormat: 'YYYY-MM-DD'
        }
      },
      {
        field: `handleMan`,
        label: `操作人员`,
        component: 'ElInput',
        colProps: {
          xl: 8,
          lg: 12
        }
      },
      {
        field: `handleTime`,
        label: `处理时间`,
        component: 'ElDatePicker',
        colProps: {
          xl: 8,
          lg: 12
        },
        componentProps: {
          valueFormat: 'YYYY-MM-DD'
        }
      }
    ]
  };
}
export function getBrandFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `keyword`,
        label: `输入搜索`,
        component: 'ElInput',

        colProps: {
          lg: 12,
          xl: 8
        }
      }
    ]
  };
}
export function getProductAttrFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `name`,
        label: `输入搜索`,
        component: 'ElInput',

        colProps: {
          lg: 12,
          xl: 8
        }
      }
    ]
  };
}
export const brandModalBrandSchemas: FormSchema[] = [
  {
    field: `name`,
    label: `品牌名称`,
    component: 'ElInput',

    colProps: {
      lg: 12,
      xl: 12
    }
  },
  {
    field: `firstLetter`,
    label: `品牌首字母`,
    component: 'ElInput',

    colProps: {
      lg: 12,
      xl: 12
    }
  },
  {
    field: `logo`,
    label: `品牌LOGO`,

    colProps: {
      lg: 12,
      xl: 12
    },
    render: (getValues, formModel) => {
      return <BasicUpload></BasicUpload>;
    }
  },
  {
    field: `sort`,
    label: `排序`,
    component: 'ElInput',

    colProps: {
      lg: 24,
      xl: 24
    }
  },
  {
    field: `showStatus`,
    label: `是否显示`,

    colProps: {
      lg: 12,
      xl: 12
    },
    render: (getValues, formModel) => {
      return (
        <ElRadioGroup v-model={formModel.showStatus}>
          <ElRadio label={1} size="large">
            是
          </ElRadio>
          <ElRadio label={0} size="large">
            否
          </ElRadio>
        </ElRadioGroup>
      );
    }
  },
  {
    field: `factoryStatus`,
    label: `品牌制造商`,

    colProps: {
      lg: 12,
      xl: 12
    },
    render: (getValues, formModel) => {
      return (
        <ElRadioGroup v-model={formModel.factoryStatus}>
          <ElRadio label={1} size="large">
            是
          </ElRadio>
          <ElRadio label={0} size="large">
            否
          </ElRadio>
        </ElRadioGroup>
      );
    }
  }
];

export const productAttributeFormSchemas: FormSchema[] = [
  {
    field: `name`,
    label: `品牌名称`,
    component: 'ElInput',

    colProps: {
      lg: 12,
      xl: 12
    }
  }
];

const colPropsCommon = {
  lg: 24,
  xl: 24
};

const itemPropsCommon = {
  labelWidth: '100px'
};
export const productCateFormSchemas = (list: any[] = [], CascaderList = []): FormSchema[] => {
  return [
    {
      field: `name`,
      label: `品牌名称`,
      component: 'ElInput',

      colProps: colPropsCommon,
      itemProps: itemPropsCommon
    },
    {
      field: `parentId`,
      label: `上级分类`,
      component: 'ElSelect',
      colProps: colPropsCommon,
      searchList: list.length > 0 ? list : [],
      itemProps: itemPropsCommon
    },
    {
      field: `productUnit`,
      label: `数量单位`,
      component: 'ElInput',

      itemProps: itemPropsCommon,
      colProps: colPropsCommon
    },
    {
      field: `sort`,
      label: `排序`,
      component: 'ElInput',

      colProps: colPropsCommon,
      itemProps: itemPropsCommon
    },
    {
      field: `showStatus`,
      label: `是否显示`,

      colProps: colPropsCommon,
      itemProps: itemPropsCommon,

      render: (getValues, formModel) => {
        return (
          <ElRadioGroup v-model={formModel.showStatus}>
            <ElRadio label={1} size="large">
              是
            </ElRadio>
            <ElRadio label={0} size="large">
              否
            </ElRadio>
          </ElRadioGroup>
        );
      }
    },
    {
      field: `navStatus`,
      label: `显示在导航栏`,

      colProps: colPropsCommon,
      itemProps: {
        labelWidth: '120px'
      },

      render: (getValues, formModel) => {
        return (
          <ElRadioGroup v-model={formModel.navStatus}>
            <ElRadio label={1} size="large">
              是
            </ElRadio>
            <ElRadio label={0} size="large">
              否
            </ElRadio>
          </ElRadioGroup>
        );
      }
    },
    {
      field: `productAttributeIdList`,
      label: `筛选属性`,
      component: 'ElCascader',
      colProps: colPropsCommon,
      itemProps: itemPropsCommon,

      searchList: CascaderList.length > 0 ? CascaderList : []
    },
    {
      field: `keywords`,
      label: `关键词`,
      component: 'ElInput',

      colProps: colPropsCommon,
      itemProps: itemPropsCommon
    },
    {
      field: `description`,
      label: `分类描述`,
      component: 'ElInput',

      colProps: colPropsCommon,
      itemProps: itemPropsCommon
    }
  ];
};

export const getEditUserSchema: FormSchema[] = [
  {
    field: `title`,
    label: `活动标题：`,
    component: 'ElInput',
    colProps: colPropsCommon
  },
  {
    field: `startDate`,
    label: `开始时间：    `,
    component: 'ElDatePicker',
    colProps: {
      xl: 8,
      lg: 12
    },
    componentProps: {
      valueFormat: 'YYYY-MM-DD'
    }
  },
  {
    field: `endDate`,
    label: `结束时间：    `,
    component: 'ElDatePicker',
    colProps: {
      xl: 8,
      lg: 12
    },
    componentProps: {
      valueFormat: 'YYYY-MM-DD'
    }
  },

  {
    field: `status`,
    label: `线上/线下`,
    component: 'ElSelect',
    colProps: {
      xl: 8,
      lg: 12
    },
    render: (getValues, formModel) => {
      return (
        <ElRadioGroup v-model={formModel.status}>
          <ElRadio label={1} size="large">
            是
          </ElRadio>
          <ElRadio label={0} size="large">
            否
          </ElRadio>
        </ElRadioGroup>
      );
    }
  }
];
const plates = [
  {
    title: '全平台',
    field: 0
  },
  {
    title: '移动平台',
    field: 1
  },
  {
    title: 'PC平台',
    field: 2
  }
];
export const getEditCoupSchema: FormSchema[] = [
  {
    field: `type`,
    label: `优惠券类型`,
    component: 'ElSelect',
    searchList: coupTypeList,
    colProps: colPropsCommon
  },
  {
    field: `name`,
    label: `优惠券名称`,
    component: 'ElInput',
    colProps: colPropsCommon
  },
  {
    field: `platform`,
    label: `适用平台`,
    component: 'ElSelect',
    colProps: colPropsCommon,
    searchList: plates
  },
  {
    field: `publishCount`,
    label: `总发行量`,
    component: 'ElInput',
    colProps: colPropsCommon
  },
  {
    field: `amount`,
    label: `面额`,
    component: 'ElInput',
    colProps: colPropsCommon
  },
  {
    field: `perLimit`,
    label: `每人限领`,
    component: 'ElInput',
    colProps: colPropsCommon
  },
  {
    field: `minPoint`,
    label: `使用门槛`,
    component: 'ElInput',
    colProps: colPropsCommon
  },
  {
    field: `enableTime`,
    label: `领取日期`,
    component: 'ElDatePicker',
    colProps: colPropsCommon,

    componentProps: {
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
      type: 'datetime'
    }
  },
  {
    field: `endTime`,
    label: `结束日期`,
    component: 'ElDatePicker',
    colProps: colPropsCommon,

    componentProps: {
      valueFormat: 'YYYY-MM-DD hh:mm:ss'
    },
    show: false
  },
  {
    field: `startTime`,
    label: `有效期`,

    colProps: colPropsCommon,

    render: (getValues, formModel) => {
      return (
        <>
          <ElDatePicker
            v-model={formModel.startTime}
            type="datetime"
            value-format="YYYY-MM-DD hh:mm:ss"
          />
          <ElDatePicker
            v-model={formModel.endTime}
            type="datetime"
            value-format="YYYY-MM-DD hh:mm:ss"
          />
        </>
      );
    }
  },
  {
    field: `canUes`,
    label: `可使用商品`,

    colProps: {
      lg: 24,
      md: 24
    },
    render: (param, model) => {
      return (
        <>
          <CoupEidtType model={model}></CoupEidtType>
        </>
      );
    }
  },
  {
    field: `note`,
    label: `备注`,
    component: 'ElInputTextArea',
    colProps: colPropsCommon
  }
];
export const getEditFlashProductSchema: FormSchema[] = [
  {
    field: `name`,
    label: `商品名称：`,
    component: 'ElInput',
    colProps: colPropsCommon,
    render: (value, formModel) => {
      return <>{formModel.name}</>;
    }
  },
  {
    field: `productSn`,
    label: `货号： `,
    component: 'ElInput',
    colProps: colPropsCommon,
    render: (value, formModel) => {
      return <>{formModel.productSn}</>;
    }
  },
  {
    field: `price`,
    label: `商品价格： `,
    component: 'ElInput',
    colProps: colPropsCommon
  },
  {
    field: `flashPromotionPrice`,
    label: `秒杀价格： `,
    component: 'ElInput',
    colProps: colPropsCommon
  },
  {
    field: `stock`,
    label: `剩余数量： `,
    component: 'ElInput',
    colProps: colPropsCommon
  },
  {
    field: `flashPromotionCount`,
    label: `秒杀数量： `,
    component: 'ElInput',
    colProps: colPropsCommon
  },
  {
    field: `flashPromotionLimit`,
    label: `限购数量： `,
    component: 'ElInput',
    colProps: colPropsCommon
  },
  {
    field: `sort`,
    label: `排序：`,
    component: 'ElInput',
    colProps: colPropsCommon
  }
];
export const getTimeEditUserSchema: FormSchema[] = [
  {
    field: `name`,
    label: `秒杀时间段名称：`,
    component: 'ElInput',
    colProps: colPropsCommon
  },
  {
    field: `startTime`,
    label: `每日开始时间：`,
    component: 'ElTimePicker',
    colProps: colPropsCommon,
    componentProps: {
      valueFormat: 'HH:mm:ss'
    }
  },
  {
    field: `endTime`,
    label: `每日结束时间：`,
    component: 'ElTimePicker',
    colProps: colPropsCommon,
    componentProps: {
      valueFormat: 'HH:mm:ss'
    }
  },

  {
    field: `status`,
    label: `启用`,
    component: 'ElSelect',
    colProps: colPropsCommon,
    render: (getValues, formModel) => {
      return (
        <ElRadioGroup v-model={formModel.status}>
          <ElRadio label={1} size="large">
            是
          </ElRadio>
          <ElRadio label={0} size="large">
            否
          </ElRadio>
        </ElRadioGroup>
      );
    }
  }
];
