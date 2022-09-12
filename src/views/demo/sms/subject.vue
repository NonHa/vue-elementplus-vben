<template>
  <Recommend
    :baseApi="{
      list: getRecommendSubjectList,
      add: addRecommendSubject,
      update: updateRecommendSubject,
      delete: deleteRecommendSubject
    }"
    :baseColumn="getHomeSubjectColumns"
    :addColumn="getSubjectColumns"
    :addTableApi="subjectList"
    :baseSchema="getEditHomeBrandSchema"
    :searchSchema="getProductSchema"
    :addRecommendListBeafore="addRecommendListBeafore"
    addTableText="选择专题"
  />
</template>
<script lang="ts" setup>
import Recommend from './recommend.vue';
import {
  getHomeSubjectColumns,
  getEditHomeBrandSchema,
  getSubjectColumns,
  getProductSchema
} from './promotionData';
import {
  getRecommendSubjectList,
  addRecommendSubject,
  updateRecommendSubject,
  deleteRecommendSubject
} from '/@/api/sys/promotion';
import { subjectList } from '/@/api/sys/table';

const addRecommendListBeafore = (list) => {
  return list.map((v) => {
    return {
      subjectId: v.id,
      subjectName: v.title,
      recommendStatus: 0,
      sort: 0
    };
  });
};
</script>
