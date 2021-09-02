import { IUploadImageState, IUploadImageProps } from './upload-image.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useRef } from 'react';
import { ActionSheet, Toast } from 'antd-mobile';
import { UploadImageService } from '~/solution/model/services/upload-image.service';
import { EventBus } from '~/solution/shared/utils/event';
const isIOS = window.isAppWebView === 'iOS';
// 现在只支持单张长传
export function useUploadImageStore(props: IUploadImageProps) {
  const { state, setStateWrap } = useStateStore(new IUploadImageState());
  const uploadImageService: UploadImageService = new UploadImageService();
  const fileSelectorInput = useRef(null);
  const { getCurrentFile, removeCurrentFile } = props;

  function handleupload(option: { type: string; message: any }) {
    const { type, message } = option;
    if (type === 'img' && message) {
      getCurrentFile(message);
    } else {
      Toast.fail('上传图片失败');
    }
  }

  function onChange(file: any, action: string) {
    if (action == 'add') {
      const fd = new FormData();
      fd.append('file', file.file);
      uploadImageService.uploadImage(fd).subscribe(files => {
        getCurrentFile(files[0].fileFullUrl);
      });
    }
  }

  function showActionSheet() {
    const BUTTONS = ['预览', '删除', '取消'];
    ActionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 2,
        // title: 'title',
        message: '',
        maskClosable: true
      },
      buttonIndex => {
        buttonIndex == 1 ? removeCurrentFile() : showCurrentImage();
      }
    );
  }

  function showCurrentImage() {
    setStateWrap({ modalIsOpen: !state.modalIsOpen });
  }

  function onFileChange() {
    const fileSelectorEl = fileSelectorInput.current;
    if (fileSelectorEl && fileSelectorEl.files && fileSelectorEl.files.length) {
      const files = fileSelectorEl.files;
      parseFile(files[0], 0).then((file: any) => {
        onChange(file, 'add');
      });
    }
  }

  function getOrientation(file: any, callback: (_: number) => void) {
    const reader = new FileReader();
    reader.onload = e => {
      const view = new DataView((e.target as any).result);
      if (view.getUint16(0, false) !== 0xffd8) {
        return callback(-2);
      }
      const length = view.byteLength;
      let offset = 2;
      while (offset < length) {
        const marker = view.getUint16(offset, false);
        offset += 2;
        if (marker === 0xffe1) {
          const tmp = view.getUint32((offset += 2), false);
          if (tmp !== 0x45786966) {
            return callback(-1);
          }
          const little = view.getUint16((offset += 6), false) === 0x4949;
          offset += view.getUint32(offset + 4, little);
          const tags = view.getUint16(offset, little);
          offset += 2;
          for (let i = 0; i < tags; i++) {
            if (view.getUint16(offset + i * 12, little) === 0x0112) {
              return callback(view.getUint16(offset + i * 12 + 8, little));
            }
          }
        } else if ((marker & 0xff00) !== 0xff00) {
          break;
        } else {
          offset += view.getUint16(offset, false);
        }
      }
      return callback(-1);
    };
    reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
  }

  // 便于以后拓展，生成本地url
  function parseFile(file: any, index: number) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const dataURL = (e.target as any).result;
        if (!dataURL) {
          reject(`Fail to get the ${index} image`);
          return;
        }

        let orientation = 1;
        getOrientation(file, res => {
          // -2: not jpeg , -1: not defined
          if (res > 0) {
            orientation = res;
          }
          resolve({
            url: dataURL,
            orientation,
            file
          });
        });
      };
      reader.readAsDataURL(file);
    });
  }

  function handleClickImg() {
    if (!isIOS && window.isAppWebView) {
      const eventBus = new EventBus();
      window.eventBus = eventBus;
      eventBus.subscribe(handleupload);
      window.czb.uploadImg();
    }
  }

  return { handleClickImg, state, onChange, fileSelectorInput, onFileChange, showActionSheet, showCurrentImage };
}
