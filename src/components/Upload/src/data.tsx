import type { BasicColumn, ActionItem } from '/@/components/Table';
import { FileItem, PreviewFileItem, UploadResultStatus } from './typing';
import {
  // checkImgType,
  isImgTypeByName
} from './helper';
import { ElProgress, ElTag } from 'element-plus';
import TableAction from '/@/components/Table/src/components/TableAction.vue';
import ThumbUrl from './ThumbUrl.vue';
// import { useI18n } from '/@/hooks/web/useI18n';

// const { t } = useI18n();

// 文件上传列表
export function createTableColumns(): BasicColumn[] {
  return [
    {
      columnKey: 'thumbUrl',
      label: '略缩图',
      width: 100,
      formatter: ({ record }) => {
        const { thumbUrl } = (record as FileItem) || {};
        return thumbUrl && <ThumbUrl fileUrl={thumbUrl} />;
      }
    },
    {
      columnKey: 'name',
      label: '文件名',
      align: 'left',
      formatter: ({ text, record }) => {
        const { percent, status: uploadStatus } = (record as FileItem) || {};
        let status: 'exception' | 'warning' | 'success' = 'success';
        if (uploadStatus === UploadResultStatus.ERROR) {
          status = 'exception';
        } else if (uploadStatus === UploadResultStatus.UPLOADING) {
          status = 'warning';
        } else if (uploadStatus === UploadResultStatus.SUCCESS) {
          status = 'success';
        }
        return (
          <span>
            <p class="truncate mb-1" title={text}>
              {text}
            </p>
            <ElProgress percent={percent} size="small" status={status} />
          </span>
        );
      }
    },
    {
      columnKey: 'size',
      label: '文件大小',
      width: 100,
      formatter: ({ text = 0 }) => {
        return text && (text / 1024).toFixed(2) + 'KB';
      }
    },
    // {
    //   columnKey: 'type',
    //   label: '文件类型',
    //   width: 100,
    // },
    {
      columnKey: 'status',
      label: '状态',
      width: 100,
      formatter: ({ text }) => {
        if (text === UploadResultStatus.SUCCESS) {
          return <ElTag color="green">{() => 'component.upload.uploadSuccess'}</ElTag>;
        } else if (text === UploadResultStatus.ERROR) {
          return <ElTag color="red">{() => 'component.upload.uploadError'}</ElTag>;
        } else if (text === UploadResultStatus.UPLOADING) {
          return <ElTag color="blue">{() => 'component.upload.uploading'}</ElTag>;
        }

        return text;
      }
    }
  ];
}
export function createActionColumn(handleRemove: Function): BasicColumn {
  return {
    width: 120,
    label: '操作',
    columnKey: 'action',
    fixed: false,
    formatter: ({ record }) => {
      const actions: ActionItem[] = [
        {
          label: 'component.upload.del',
          color: 'error',
          onClick: handleRemove.bind(null, record)
        }
      ];
      // if (checkImgType(record)) {
      //   actions.unshift({
      //     label: ('component.upload.preview'),
      //     onClick: handlePreview.bind(null, record),
      //   });
      // }
      return <TableAction actions={actions} outside={true} />;
    }
  };
}
// 文件预览列表
export function createPreviewColumns(): BasicColumn[] {
  return [
    {
      columnKey: 'url',
      label: 'component.upload.legend',
      width: 100,
      formatter: (row) => {
        const { url } = (row as PreviewFileItem) || {};
        if (isImgTypeByName(url)) {
          return <ThumbUrl fileUrl={url} />;
        } else {
          return <>123</>;
        }
      }
    },
    {
      columnKey: 'name',
      label: 'component.upload.fileName',
      align: 'left'
    }
  ];
}

export function createPreviewActionColumn({
  handleRemove,
  handleDownload
}: {
  handleRemove: Fn;
  handleDownload: Fn;
}): BasicColumn {
  return {
    width: 160,
    label: '操作',
    columnKey: 'action',
    fixed: false,
    formatter: ({ record }) => {
      const actions: ActionItem[] = [
        {
          label: 'component.upload.del',
          color: 'error',
          onClick: handleRemove.bind(null, record)
        },
        {
          label: 'component.upload.download',
          onClick: handleDownload.bind(null, record)
        }
      ];

      return <TableAction actions={actions} outside={true} />;
    }
  };
}
