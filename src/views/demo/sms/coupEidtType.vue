<template>
  <el-radio-group v-model="model.useType" style="margin-bottom: 30px">
    <el-radio-button :label="0">全场通用</el-radio-button>
    <el-radio-button :label="1">指定分类</el-radio-button>
    <el-radio-button :label="2">指定商品</el-radio-button>
  </el-radio-group>

  <div>
    <template v-if="model.useType === 1">
      <el-row>
        <el-col :span="12">
          <el-cascader v-model="selectType" :options="options" />
        </el-col>
        <el-col :span="12">
          <el-button @click="dataAdd('cate')">添加</el-button>
        </el-col>
      </el-row>

      <BasicTable :columns="columnsCate" :data-source="dataCate" :height="200">
        <template #col-operate="{ row }">
          <el-button @click="dataDelete(row, 'cate')">删除</el-button>
        </template>
      </BasicTable>
    </template>
    <template v-else-if="model.useType === 2">
      <el-row>
        <el-col :span="12">
          <el-select
            v-model="productValue"
            filterable
            remote
            reserve-keyword
            placeholder="Please enter a keyword"
            :remote-method="remoteMethod"
            @change="productSelect"
          >
            <el-option
              v-for="item in productOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-button @click="dataAdd('product')">添加</el-button>
        </el-col>
      </el-row>

      <BasicTable :columns="columnsProduct" :data-source="dataProduct" :height="200">
        <template #col-operate="{ row }">
          <el-button @click="dataDelete(row, 'product')">删除</el-button>
        </template>
      </BasicTable>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType, toRefs, unref } from 'vue';
import { useProductStore } from '/@/store/modules/product';
import { BasicTable, ColumnChangeParam, useTable } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { simpleList } from '/@/api/sys/table';

const props = defineProps({
  model: {
    type: Object as PropType<{ useType: Number }>
  }
});
const selectType = ref([]);
const dataCate = ref([]);
const dataProduct = ref([]);
const productValue = ref();
const productOptions = ref([]);
const productSelectItem = ref({});
const { model } = toRefs(props);

const columnsCate: BasicColumn[] = [
  {
    label: '分类名称',
    prop: 'name',
    width: 150,
    formatter: (row) => {
      return `${unref(row).parentCategoryName}/${unref(row).productCategoryName}`;
    }
  },
  {
    label: '操作',
    prop: 'operate',
    width: 150,
    slot: true
  }
];
const columnsProduct: BasicColumn[] = [
  {
    label: '商品名称',
    prop: 'productName',
    width: 150
  },
  {
    label: '货号',
    prop: 'productSn',
    width: 150
  },
  {
    label: '操作',
    prop: 'operate',
    width: 150,
    slot: true
  }
];
const { getProductCategoryList } = useProductStore();
const cateList = getProductCategoryList.map((v) => {
  return {
    value: v.id,
    label: v.name,
    children: v.children.map((k) => {
      return {
        value: k.id,
        label: k.name
      };
    })
  };
});
const options = ref(cateList);
const dataAdd = (type) => {
  if (type === 'cate') {
    dataCate.value.push({
      id: selectType.value[1],
      index: dataCate.value.length + 1,
      productCategoryId: selectType.value[1],
      parentCategoryName: cateList.filter((v) => v.value === selectType.value[0])[0].label,
      productCategoryName: cateList
        .filter((v) => v.value === selectType.value[0])[0]
        .children.filter((k) => k.value === selectType.value[1])[0].label
    });
  } else {
    dataProduct.value.push({
      id: dataCate.value.length + 1,
      index: dataCate.value.length + 1,
      productId: productSelectItem.value.value,
      productName: productSelectItem.value.label,
      productSn: productSelectItem.value.sn
    });
  }

  modelValueUpdate();
};
const dataDelete = (row, type) => {
  if (type === 'cate') {
    dataCate.value.splice(row.index - 1, 1);
    dataCate.value.forEach((v, index) => {
      v.index = index + 1;
    });
  } else {
    dataProduct.value.splice(row.index - 1, 1);
    dataProduct.value.forEach((v, index) => {
      v.index = index + 1;
    });
  }
};

const modelValueUpdate = () => {
  unref(model).productCategoryRelationList = dataCate.value.map((v) => {
    return {
      productCategoryId: v.productCategoryId,
      parentCategoryName: v.parentCategoryName,
      productCategoryName: v.productCategoryName
    };
  });
  unref(model).productRelationList = dataProduct.value.map((v) => {
    return {
      productId: v.productId,
      productName: v.productName,
      productSn: v.productSn
    };
  });
};

const remoteMethod = (query) => {
  if (query) {
    setTimeout(() => {
      simpleList({ keyword: query }).then((res) => {
        productOptions.value = res.data.list.map((v) => {
          return {
            label: v.name,
            value: v.id,
            sn: v.productSn
          };
        });
      });
    }, 200);
  } else {
    productOptions.value = [];
    productSelectItem.value = {};
  }
};

const productSelect = (e) => {
  productSelectItem.value = productOptions.value.filter((v) => {
    return v.value === e;
  })[0];
};
</script>
