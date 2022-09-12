import { ElMessageBox, ElMessage, ElNotification } from 'element-plus';
// import { Modal, message as Message, notification } from 'ant-design-vue';
import { CircleCheckFilled, CircleCloseFilled, InfoFilled } from '@element-plus/icons-vue';

import type { ElMessageBoxOptions } from 'element-plus/lib/components/message-box/src/message-box.type';
import type { Notify } from 'element-plus/lib/components/notification/src/notification';
import { isString } from '/@/utils/is';
type MessageIconType = '' | 'success' | 'warning' | 'info' | 'error';
enum positionEnum {
  TopRight = 'top-right',
  TopLeft = 'top-left',
  BottomRight = 'bottom-right',
  BottomLeft = 'bottom-left',
}

export declare type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
// export declare type IconType = 'success' | 'info' | 'error' | 'warning';
export type ModalOptionsEx = ElMessageBoxOptions;
export type ModalOptionsPartial = Partial<ModalOptionsEx> & Pick<ModalOptionsEx, 'message'>;

function getIcon(iconType: string) {
  if (iconType === 'warning') {
    return <InfoFilled class="modal-icon-warning" />;
  } else if (iconType === 'success') {
    return <CircleCheckFilled class="modal-icon-success" />;
  } else if (iconType === 'info') {
    return <InfoFilled class="modal-icon-info" />;
  } else {
    return <CircleCloseFilled class="modal-icon-error" />;
  }
}

function renderContent({ message }: Pick<ModalOptionsEx, 'message'>) {
  if (isString(message)) {
    return <div innerHTML={`<div>${message as string}</div>`}></div>;
  } else {
    return message;
  }
}

enum btnSize {
  small = 'small',
}
const getBaseOptions = () => {
  return {
    buttonSize: btnSize.small,
    center: true,
  };
};

function createModalOptions(options: ModalOptionsEx, iconType: MessageIconType): ModalOptionsEx {
  return {
    ...options,
    type: iconType,
    icon: getIcon(iconType),
    ...getBaseOptions(),
    message: renderContent(options),
  };
}

function createSuccessModal(options: ModalOptionsPartial) {
  return ElMessageBox.confirm(
    options.message,
    options.title,
    createModalOptions(options, 'success')
  );
}

function createErrorModal(options: ModalOptionsPartial) {
  return ElMessageBox.confirm(options.message, options.title, createModalOptions(options, 'error'));
}

function createInfoModal(options: ModalOptionsPartial) {
  return ElMessageBox.confirm(options.message, options.title, createModalOptions(options, 'info'));
}

function createWarningModal(options: ModalOptionsPartial) {
  return ElMessageBox.confirm(
    options.message,
    options.title,
    createModalOptions(options, 'warning')
  );
}

ElNotification({
  position: positionEnum.TopRight,
  duration: 3,
});

/**
 * @description: message
 */
export function useMessage() {
  return {
    createMessage: ElMessage,
    notification: ElNotification as Notify,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal,
  };
}
