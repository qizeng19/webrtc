/**
 * @export state变量定义和初始化
 * @class IUploadImageState
 */
export class IUploadImageState {
  isShowActionSheet = false;
  modalIsOpen = false;
}

export interface IUploadImageProps {
  // 获取当前上传的图片文件
  getCurrentFile: Function;
  // 获取当前显示文件
  file?: string;
  // 移除当前显示文件
  removeCurrentFile: Function;
  // 覆盖样式
  styleProps?: any;
  // 中心图
  backImage?: string;
  // 图片状态
  imageStatus?: number;
}
