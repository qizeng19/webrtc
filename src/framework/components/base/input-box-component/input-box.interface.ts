/**
 * @export state变量定义和初始化
 * @class IInputBoxState
 */
export class IInputBoxState {
  visible = false;
}
export interface IInputBoxProps {
  inputTitle?: string;
  inputPlaceholder?: string;
  valueChange: ($event: any) => void;
  inputValue?: any;
  isRequire?: boolean;
  modalType?: string;
  editAble?: boolean;
  type?: string;
  otherParams?: any;
  showBorder?: boolean;
}
