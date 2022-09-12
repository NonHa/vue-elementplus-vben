<template>
  <Recommend
    :baseApi="{
      list: getHomeBrandList,
      add: addHomeBrand,
      update: updateHomeBrand,
      delete: deleteHomeBrand
    }"
    :baseColumn="getHomeBrandColumns"
    :addColumn="getBrandColumns"
    :addTableApi="brandList"
    :baseSchema="getEditHomeBrandSchema"
    :searchSchema="getBrandSchema"
    :addRecommendListBeafore="addRecommendListBeafore"
    addTableText="选择品牌"
  />
</template>
<script lang="ts" setup>
import Recommend from './recommend.vue';
import {
  getHomeBrandColumns,
  getBrandSchema,
  getEditHomeBrandSchema,
  getBrandColumns
} from './promotionData';
import {
  getHomeBrandList,
  addHomeBrand,
  updateHomeBrand,
  deleteHomeBrand
} from '/@/api/sys/promotion';
import { brandList } from '/@/api/sys/table';

const addRecommendListBeafore = (list) => {
  return list.map((v) => {
    return {
      brandId: v.id,
      brandName: v.name,
      recommendStatus: 0,
      sort: 0
    };
  });
};
</script>
