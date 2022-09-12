<template>
  <div>
    <ElSpace>
      <el-button type="primary" @click="openUploadModal" preIcon="carbon:cloud-upload">
        {{ '上传' }}
      </el-button>
      <ElTooltip placement="bottom" v-if="showPreview">
        <template #title>
          {{ '上传' }}
          <template v-if="fileList.length">
            {{ fileList.length }}
          </template>
        </template>
        <el-button @click="openPreviewModal">
          <Icon icon="bi:eye" />
          <template v-if="fileList.length && showPreviewNumber">
            {{ fileList.length }}
          </template>
        </el-button>
      </ElTooltip>
    </ElSpace>
    <UploadModal
      v-bind="bindValue"
      :previewFileList="fileList"
      @register="registerUploadModal"
      @change="handleChange"
      @delete="handleDelete"
    />

    <UploadPreviewModal
      :value="fileList"
      @register="registerPreviewModal"
      @list-change="handlePreviewChange"
      @delete="handlePreviewDelete"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, unref, computed } from 'vue';
import { Icon } from '/@/components/Icon';
import { ElTooltip, ElSpace } from 'element-plus';
import { useModal } from '/@/components/Modal';
import { uploadContainerProps } from './props';
import { omit } from 'lodash-es';
// import { useI18n } from '/@/hooks/web/useI18n';
import { isArray } from '/@/utils/is';
import UploadModal from './UploadModal.vue';
import UploadPreviewModal from './UploadPreviewModal.vue';

export default defineComponent({
  name: 'BasicUpload',
  components: { UploadModal, ElSpace, UploadPreviewModal, Icon, ElTooltip },
  props: uploadContainerProps,
  emits: ['change', 'delete', 'preview-delete', 'update:value'],

  setup(props, { emit, attrs }) {
    // const { t } = useI18n();
    // 上传modal
    const [registerUploadModal, { openModal: openUploadModal }] = useModal();

    //   预览modal
    const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();

    const fileList = ref<string[]>([]);

    const showPreview = computed(() => {
      const { emptyHidePreview } = props;
      if (!emptyHidePreview) return true;
      return emptyHidePreview ? fileList.value.length > 0 : true;
    });

    const bindValue = computed(() => {
      const value = { ...attrs, ...props };
      return omit(value, 'onChange');
    });

    watch(
      () => props.value,
      (value = []) => {
        fileList.value = isArray(value) ? value : [];
      },
      { immediate: true }
    );

    // 上传modal保存操作
    function handleChange(urls: string[]) {
      fileList.value = [...unref(fileList), ...(urls || [])];
      emit('update:value', fileList.value);
      emit('change', fileList.value);
    }

    // 预览modal保存操作
    function handlePreviewChange(urls: string[]) {
      fileList.value = [...(urls || [])];
      emit('update:value', fileList.value);
      emit('change', fileList.value);
    }

    function handleDelete(record: Recordable) {
      emit('delete', record);
    }

    function handlePreviewDelete(url: string) {
      emit('preview-delete', url);
    }

    return {
      registerUploadModal,
      openUploadModal,
      handleChange,
      handlePreviewChange,
      registerPreviewModal,
      openPreviewModal,
      fileList,
      showPreview,
      bindValue,
      handleDelete,
      handlePreviewDelete
    };
  }
});
</script>
