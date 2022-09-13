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
  >
    <template #header-btn>
      <el-button type="success" @click="onClick">专题分类</el-button>
    </template>
  </Recommend>

  <BasicModal ref="modalRef" @ok="sureEditForm('edit')">
    <BasicForm
      @register="registerForm"
      :model="editRow"
      :schemas="getSubjectCategorySchema"
      :showActionBtn="false"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref, unref } from 'vue';
import Recommend from './recommend.vue';

import {
  getHomeSubjectColumns,
  getEditHomeBrandSchema,
  getSubjectColumns,
  getProductSchema,
  getSubjectCategorySchema
} from './promotionData';
import {
  getRecommendSubjectList,
  addRecommendSubject,
  updateRecommendSubject,
  deleteRecommendSubject,
  addSubjectCategory
} from '/@/api/sys/promotion';
import { subjectList } from '/@/api/sys/table';
import { BasicModal } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
const [registerForm, formActions] = useForm();
const editRow = ref({});
const modalRef = ref({});
const onClick = () => {
  unref(modalRef).visibleRef = true;
};
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

const sureEditForm = () => {
  console.log('editRow', formActions.getFieldsValue());

  addSubjectCategory(formActions.getFieldsValue()).then((res) => {
    if (res.code === 200) {
      unref(modalRef).visibleRef = false;
    }
  });
};
</script>
