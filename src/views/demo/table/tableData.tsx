import { FormProps, FormSchema } from '/@/components/Form/src/types/form';
import { BasicColumn } from '/@/components/Table/src/types/table';

import { ElRadioGroup, ElRadio } from 'element-plus';
import { BasicUpload } from '/@/components/Upload';
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      label: 'ID',
      prop: 'id',
      fixed: 'left',
      width: 200
    },
    {
      label: '姓名',
      prop: 'name',
      width: 150,
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' }
      ],
      editComponent: 'ElInput'
    },
    {
      label: '图片',
      prop: 'pic',
      slot: true
    },
    {
      label: '价格',
      prop: 'originalPrice'
    },
    {
      slot: true,
      label: '地址',
      prop: 'address',
      width: '160px'
    }
  ];
}
export function getBrandColumns(): BasicColumn[] {
  return [
    {
      label: '编号',
      prop: 'id',
      fixed: 'left',
      width: 200
    },
    {
      label: '品牌名称',
      prop: 'name',
      width: 150,
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' }
      ]
    },
    {
      label: '品牌首字母',
      prop: 'firstLetter'
    },
    {
      label: '排序',
      prop: 'sort'
    },
    {
      label: '品牌名称制造商',
      prop: 'factoryStatus',
      slot: true
    },
    {
      label: '是否显示',
      prop: 'showStatus',
      slot: true
    },
    {
      label: '相关',
      prop: 'productCommentCount',
      slot: true
    },
    {
      label: '操作',
      prop: 'oprate',
      width: '160px',
      slot: true
    }
  ];
}

export function getProductAttrCateColumns(): BasicColumn[] {
  return [
    {
      label: '编号',
      prop: 'id',
      fixed: 'left',
      width: 200
    },
    {
      label: '类型名称',
      prop: 'name',
      width: 150,
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' }
      ]
    },
    {
      label: '属性数量',
      prop: 'attributeCount'
    },
    {
      label: '参数数量',
      prop: 'paramCount'
    },
    {
      label: '设置',
      prop: 'set',
      width: '200px',
      slot: true
    },
    {
      label: '操作',
      prop: 'oprate',
      width: '160px',
      slot: true
    }
  ];
}

export function getProductCateColumns(): BasicColumn[] {
  return [
    {
      label: '编号',
      prop: 'id',
      fixed: 'left',
      width: 200
    },
    {
      label: '分类名称',
      prop: 'name',
      width: 150,
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' }
      ]
    },
    {
      label: '商品数量',
      prop: 'productCount'
    },
    {
      label: '数量单位',
      prop: 'productUnit'
    },
    {
      label: '是否展示',
      prop: 'showStatus'
    },
    {
      label: '设置',
      prop: 'set',
      width: '200px',
      slot: true
    },
    {
      label: '操作',
      prop: 'oprate',
      width: '160px',
      slot: true
    }
  ];
}
const renderContent = ({ text, index }: { text: any; index: number }) => {
  const obj: any = {
    children: text,
    attrs: {}
  };
  if (index === 9) {
    obj.attrs.colSpan = 0;
  }
  return obj;
};
export function getMergeHeaderColumns(): BasicColumn[] {
  return [
    {
      label: 'ID',
      prop: 'id',
      width: 300,
      formatter: renderContent
    },
    {
      label: '姓名',
      prop: 'name',
      width: 300,
      formatter: renderContent
    },
    {
      label: '地址',
      prop: 'address',
      colSpan: 2,
      width: 120,
      sortable: true,
      formatter: ({ text, index }: { text: any; index: number }) => {
        const obj: any = {
          children: text,
          attrs: {}
        };
        if (index === 2) {
          obj.attrs.rowSpan = 2;
        }
        if (index === 3) {
          obj.attrs.colSpan = 0;
        }
        return obj;
      }
    },
    {
      label: '编号',
      prop: 'no',
      colSpan: 0,
      filters: [
        { text: 'Male', value: 'male', children: [] },
        { text: 'Female', value: 'female', children: [] }
      ],
      formatter: renderContent
    },
    {
      label: '开始时间',
      prop: 'beginTime',
      width: 200,
      formatter: renderContent
    },
    {
      label: '结束时间',
      prop: 'endTime',
      width: 200,
      formatter: renderContent
    }
  ];
}
export const getAdvanceSchema = (list, brands): FormSchema[] => {
  return [
    {
      field: `keyword`,
      label: `关键字`,
      component: 'ElInput',
      colProps: {
        xl: 8,
        lg: 12
      }
    },
    {
      field: `keyword2`,
      label: `商品货号`,
      component: 'ElInput',
      colProps: {
        xl: 8,
        lg: 12
      }
    },
    {
      field: `category`,
      label: `商品分类`,
      component: 'ElCascader',
      colProps: {
        xl: 8,
        lg: 12
      },
      componentProps: {
        props: {
          value: 'field',
          label: 'title'
        }
      },
      searchList: list.map((v) => {
        return {
          field: v.id,
          title: v.name,
          children: v.children.map((k) => {
            return {
              field: k.id,
              title: k.name
            };
          })
        };
      })
    },
    {
      field: `brandId`,
      label: `商品品牌`,
      component: 'ElSelect',
      colProps: {
        xl: 8,
        lg: 12
      },
      searchList: brands.map((v) => {
        return {
          title: v.name,
          field: v.id
        };
      })
    },
    {
      field: `publishStatus`,
      label: `上架状态`,
      component: 'ElSelect',
      colProps: {
        xl: 8,
        lg: 12
      },
      searchList: [
        {
          title: '上架',
          field: 1
        },
        {
          title: '下架',
          field: 0
        }
      ]
    },
    {
      field: `verifyStatus`,
      label: `审核状态`,
      component: 'ElSelect',
      colProps: {
        xl: 8,
        lg: 12
      },
      searchList: [
        {
          title: '审核通过',
          field: 1
        },
        {
          title: '未审核',
          field: 0
        }
      ]
    }
  ];
};
export function getFormConfig(list, brand): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [...getAdvanceSchema(list, brand)]
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
  lg: 12,
  xl: 12
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
