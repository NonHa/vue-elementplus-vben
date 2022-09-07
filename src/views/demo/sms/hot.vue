<template>
  <Recommend
    :baseApi="{
      list: getRecommendProductList,
      add: addRecommendProduct,
      update: updateRecommendProduct,
      delete: deleteRecommendProduct
    }"
    :baseColumn="getHomeProductColumns"
    :addColumn="getProductColumns"
    :addTableApi="getTreeList"
    :baseSchema="getEditHomeBrandSchema"
    :searchSchema="getProductSchema"
    :addRecommendListBeafore="addRecommendListBeafore"
    addTableText="选择商品"
  />
</template>
<script lang="ts" setup>
import Recommend from './recommend.vue';
import {
  getHomeProductColumns,
  getEditHomeBrandSchema,
  getProductColumns,
  getProductSchema
} from './promotionData';
import {
  getRecommendProductList,
  addRecommendProduct,
  updateRecommendProduct,
  deleteRecommendProduct
} from '/@/api/sys/promotion';
import { getTreeList } from '/@/api/sys/table';

const addRecommendListBeafore = (list) => {
  return list.map((v) => {
    return {
      productId: v.id,
      productName: v.name,
      recommendStatus: 0,
      sort: 0
    };
  });
};
</script>
