import { FormProps, FormSchema } from '/@/components/Form/src/types/form';
import { BasicColumn } from '/@/components/Table/src/types/table';
import RenderContent from '/@/components/Table/src/components/baseColumnContent/renderContent';
import { productCategoryList, brandList } from '/@/api/sys/table';
import { ElPopconfirm, ElRadioGroup, ElRadio } from 'element-plus';
import { BasicUpload } from '/@/components/Upload';
import { setBaseTableFormatter } from '/@/hooks/event/useTableFomatter';
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      label: '编号',
      prop: 'id',
      fixed: 'left'
    },
    {
      label: '角色名称',
      prop: 'name',
      width: 150
    },
    {
      label: '描述',
      prop: 'description',
      width: 150
    },
    {
      label: '用户数',
      prop: 'adminCount'
    },

    {
      label: '提交时间',
      prop: 'createTime'
    },
    {
      label: '是否启用',
      prop: 'status',
      slot: true
    },
    {
      label: '操作',
      prop: 'operate',
      slot: true,
      width: 200
    }
  ];
}

export const getAdvanceSchema = () => {
  return [
    {
      field: `keyword`,
      label: `订单编号`,
      component: 'ElInput',
      colProps: {
        xl: 24,
        lg: 24
      }
    }
  ];
};
export const getEditUserSchema = [
  {
    field: `name`,
    label: `角色名称`,
    component: 'ElInput',
    colProps: {
      xl: 24,
      lg: 24
    }
  },

  {
    field: `description`,
    label: `描述`,
    component: 'ElInputTextArea',
    colProps: {
      xl: 24,
      lg: 24
    }
  },
  {
    field: `status`,
    label: `是否启用`,
    component: 'ElSelect',
    colProps: {
      xl: 24,
      lg: 24
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

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [...getAdvanceSchema()]
  };
}
export function getReasonConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [...getReasonSchema()]
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
            label: '待处理',
            value: 0
          },
          {
            label: '退货中',
            value: 1
          },
          {
            label: '已完成',
            value: 2
          },
          {
            label: '已拒绝',
            value: 3
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
export const brandModalBrandSchemas = [
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

export const productAttributeFormSchemas = [
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
  lg: 12,
  xl: 12
};

const itemPropsCommon = {
  labelWidth: '100px'
};
export const productCateFormSchemas = (list: any[] = [], CascaderList = []) => {
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
        lableWidth: '120px'
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
