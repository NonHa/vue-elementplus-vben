<template>
  <BasicModal
    width="800px"
    title="上传"
    okText="保存"
    v-bind="$attrs"
    @register="register"
    @ok="handleOk"
    :closeFunc="handleCloseFunc"
    :maskClosable="false"
    :keyboard="false"
    class="upload-modal"
    :okButtonProps="getOkButtonProps"
    :cancelButtonProps="{ disabled: isUploadingRef }"
  >
    <template #centerFooter>
      <el-button
        @click="handleStartUpload"
        color="success"
        :disabled="!getIsSelectFile"
        :loading="isUploadingRef"
      >
        开始上传
      </el-button>
    </template>

    <div class="upload-modal-toolbar">
      <ElAlert
        :closable="false"
        :message="getHelpText"
        title=" 支持image/*格式，单个文件不超过20MB，最多只能上传10个文件"
        type="success"
        show-icon
      />

      <ElUpload
        :accept="getStringAccept"
        :multiple="multiple"
        :before-upload="beforeUpload"
        :show-upload-list="false"
        class="upload-modal-toolbar__btn"
        :on-change="handleChange"
        :http-request="httpRequest"
      >
        <el-button type="primary">选择文件</el-button>
      </ElUpload>
    </div>
    <FileList :dataSource="fileListRef" :columns="columns" :actionColumn="actionColumn" />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, unref, computed, PropType } from 'vue';
import { ElUpload, ElAlert } from 'element-plus';
import { BasicModal, useModalInner } from '/@/components/Modal';
//   import { BasicTable, useTable } from '/@/components/Table';
// hooks
import { useUploadType } from './useUpload';
import { useMessage } from '/@/hooks/web/useMessage';
//   types
import { FileItem, UploadResultStatus } from './typing';
import { basicProps } from './props';
import { createTableColumns, createActionColumn } from './data';
// utils
import { checkImgType, getBase64WithFile } from './helper';
import { buildUUID } from '/@/utils/uuid';
import { isFunction } from '/@/utils/is';
import { warn } from '/@/utils/log';
import FileList from './FileList.vue';
// import { useI18n } from '/@/hooks/web/useI18n';

export default defineComponent({
  components: { BasicModal, ElUpload, ElAlert, FileList },
  props: {
    ...basicProps,
    previewFileList: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  emits: ['change', 'register', 'delete'],
  setup(props, { emit }) {
    const state = reactive<{ fileList: FileItem[] }>({
      fileList: []
    });

    //   是否正在上传
    const isUploadingRef = ref(false);
    const fileListRef = ref<FileItem[]>([]);
    const { accept, helpText, maxNumber, maxSize } = toRefs(props);

    // const { t } = useI18n();
    const [register, { closeModal }] = useModalInner();

    const { getStringAccept, getHelpText } = useUploadType({
      acceptRef: accept,
      helpTextRef: helpText,
      maxNumberRef: maxNumber,
      maxSizeRef: maxSize
    });

    const { createMessage } = useMessage();

    const getIsSelectFile = computed(() => {
      return (
        fileListRef.value.length > 0 &&
        !fileListRef.value.every((item) => item.status === UploadResultStatus.SUCCESS)
      );
    });

    const getOkButtonProps = computed(() => {
      const someSuccess = fileListRef.value.some(
        (item) => item.status === UploadResultStatus.SUCCESS
      );
      return {
        disabled: isUploadingRef.value || fileListRef.value.length === 0 || !someSuccess,
        type: 'success',
        loading: false
      };
    });

    const getUploadBtnText = computed(() => {
      const someError = fileListRef.value.some((item) => item.status === UploadResultStatus.ERROR);
      return isUploadingRef.value
        ? 'component.upload.uploading'
        : someError
        ? 'component.upload.reUploadFailed'
        : 'component.upload.startUpload';
    });
    function handleChange(file) {
      console.log(document.getElementsByClassName('el-upload__input')[0].value);
    }
    function httpRequest(file) {
      // console.log('file', file);
    }
    // 上传前校验
    function beforeUpload(file: File) {
      const { size, name } = file;
      console.log('“file”', document.getElementsByName('el-upload__input'));
      const { maxSize } = props;
      // 设置最大值，则判断
      if (maxSize && file.size / 1024 / 1024 >= maxSize) {
        // createMessage.error(('component.upload.maxSizeMultiple', [maxSize]));
        createMessage.error('component.upload.maxSizeMultiple');
        return false;
      }

      const commonItem = {
        uuid: buildUUID(),
        file,
        size,
        name,
        percent: 0,
        type: name.split('.').pop()
      };
      // 生成图片缩略图
      if (checkImgType(file)) {
        // beforeUpload，如果异步会调用自带上传方法
        // file.thumbUrl = await getBase64(file);
        getBase64WithFile(file).then(({ result: thumbUrl }) => {
          fileListRef.value = [
            ...unref(fileListRef),
            {
              thumbUrl,
              ...commonItem
            }
          ];
        });
      } else {
        fileListRef.value = [...unref(fileListRef), commonItem];
      }
      return false;
    }

    // 删除
    function handleRemove(record: FileItem) {
      const index = fileListRef.value.findIndex((item) => item.uuid === record.uuid);
      index !== -1 && fileListRef.value.splice(index, 1);
      emit('delete', record);
    }

    // 预览
    // function handlePreview(record: FileItem) {
    //   const { thumbUrl = '' } = record;
    //   createImgPreview({
    //     imageList: [thumbUrl],
    //   });
    // }

    async function uploadApiByItem(item: FileItem) {
      console.log('item', item);
      // return;
      const { api } = props;
      if (!api || !isFunction(api)) {
        return warn('upload api must exist and be a function');
      }
      try {
        item.status = UploadResultStatus.UPLOADING;
        const { data } = await props.api?.(
          {
            data: {
              ...(props.uploadParams || {})
            },
            file: item.file,
            name: props.name,
            filename: props.filename
          },
          function onUploadProgress(progressEvent: ProgressEvent) {
            const complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
            item.percent = complete;
          }
        );
        item.status = UploadResultStatus.SUCCESS;
        item.responseData = data;
        return {
          success: true,
          error: null
        };
      } catch (e) {
        console.log(e);
        item.status = UploadResultStatus.ERROR;
        return {
          success: false,
          error: e
        };
      }
    }

    // 点击开始上传
    async function handleStartUpload() {
      const { maxNumber } = props;
      if ((fileListRef.value.length + props.previewFileList?.length ?? 0) > maxNumber) {
        // return createMessage.warning(('component.upload.maxNumber', [maxNumber]));
        return createMessage.warning('component.upload.maxNumber');
      }
      try {
        isUploadingRef.value = true;
        // 只上传不是成功状态的
        const uploadFileList =
          fileListRef.value.filter((item) => item.status !== UploadResultStatus.SUCCESS) || [];
        const data = await Promise.all(
          uploadFileList.map((item) => {
            return uploadApiByItem(item);
          })
        );
        isUploadingRef.value = false;
        // 生产环境:抛出错误
        const errorList = data.filter((item: any) => !item.success);
        if (errorList.length > 0) throw errorList;
      } catch (e) {
        isUploadingRef.value = false;
        throw e;
      }
    }

    //   点击保存
    function handleOk() {
      const { maxNumber } = props;

      if (fileListRef.value.length > maxNumber) {
        // return createMessage.warning(('component.upload.maxNumber', [maxNumber]));
        return createMessage.warning('component.upload.maxNumber');
      }
      if (isUploadingRef.value) {
        return createMessage.warning('component.upload.saveWarn');
      }
      const fileList: string[] = [];

      for (const item of fileListRef.value) {
        const { status, responseData } = item;
        if (status === UploadResultStatus.SUCCESS && responseData) {
          fileList.push(responseData.url);
        }
      }
      // 存在一个上传成功的即可保存
      if (fileList.length <= 0) {
        return createMessage.warning('component.upload.saveError');
      }
      fileListRef.value = [];
      closeModal();
      emit('change', fileList);
    }

    // 点击关闭：则所有操作不保存，包括上传的
    async function handleCloseFunc() {
      if (!isUploadingRef.value) {
        fileListRef.value = [];
        return true;
      } else {
        createMessage.warning('component.upload.uploadWait');
        return false;
      }
    }

    return {
      httpRequest,
      columns: createTableColumns() as any[],
      actionColumn: createActionColumn(handleRemove) as any,
      register,
      closeModal,
      getHelpText,
      getStringAccept,
      getOkButtonProps,
      beforeUpload,
      // registerTable,
      fileListRef,
      state,
      isUploadingRef,
      handleStartUpload,
      handleOk,
      handleCloseFunc,
      getIsSelectFile,
      getUploadBtnText,
      handleChange
      // t,
    };
  }
});
</script>
<style lang="less">
.upload-modal {
  .ant-upload-list {
    display: none;
  }

  .ant-table-wrapper .ant-spin-nested-loading {
    padding: 0;
  }

  &-toolbar {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    &__btn {
      margin-left: 8px;
      text-align: right;
      flex: 1;
      .el-upload-list {
        margin: 0;
      }
    }
  }
}
</style>
