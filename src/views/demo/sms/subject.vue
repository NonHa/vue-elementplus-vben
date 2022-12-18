<template>
  <Recommend
    ref="recommend"
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
      <el-button type="success" @click="onClick(1)">专题分类</el-button>
    </template>
    <template #edit-header-btn>
      <el-button type="success" @click="onClick(2)">新增</el-button>
    </template>
  </Recommend>

  <BasicModal ref="modalRef" @ok="sureEditForm('edit')">
    <BasicForm @register="registerForm" :model="editRow" :schemas="schema" :showActionBtn="false" />
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
  getSubjectCategorySchema,
  getSubjectSchema
} from './promotionData';
import {
  getRecommendSubjectList,
  addRecommendSubject,
  updateRecommendSubject,
  deleteRecommendSubject,
  addSubjectCategory,
  subjectCategoryList
} from '/@/api/sys/promotion';
import { subjectList, addSubject } from '/@/api/sys/table';
import { BasicModal } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { FormSchema } from '/@/components/Form/src/types/form';

const [registerForm, formActions] = useForm();
const recommend = ref();

const editRow = ref<{}>({});
const modalRef = ref<{ visibleRef: boolean }>({});
const schema = ref<FormSchema[]>(getSubjectCategorySchema);
let cliclType = 1;
let categoryList: { title: string; field: number }[] = [];
const onClick = async (type: number) => {
  cliclType = type;
  if (type === 1) {
    schema.value = getSubjectCategorySchema;
  } else {
    await subjectCategoryList().then((res) => {
      categoryList = res.data.list.map((v) => {
        return {
          title: v.name,
          field: v.id
        };
      });
      schema.value = getSubjectSchema(categoryList);
    });
  }
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

  if (cliclType === 1) {
    addSubjectCategory(formActions.getFieldsValue()).then((res) => {
      if (res.code === 200) {
        unref(modalRef).visibleRef = false;
      }
    });
  } else {
    // return;
    addSubject({
      ...formActions.getFieldsValue(),
      categoryName: categoryList.filter(
        (v) => v.field === formActions.getFieldsValue().categoryId
      )[0].title
    }).then((res) => {
      if (res.code === 200) {
        unref(modalRef).visibleRef = false;
        unref(recommend).reload2();
      }
    });
  }
};
</script>
