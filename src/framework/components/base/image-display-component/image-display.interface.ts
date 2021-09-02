import { AccidentImage } from '~/solution/model/dto/report-completed.dto';

/**
 * @export state变量定义和初始化
 * @class IImageDisplayState
 */
export class IImageDisplayState {
  isShowActionSheet = false;
  modalIsOpen = false;
  file: string;
}
export interface IImageDisplayProps {
  imageDisplayTitle: string;
  showAttentionIcon?: boolean;
  showRemark?: boolean;
  fileInfoList: Array<AccidentImage>;
}
