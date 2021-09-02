/**
 * @export state变量定义和初始化
 * @class IIChooseDateState
 */
export class IIChooseDateState {
  value: Date;
}

export interface IIChooseDateProps {
  visible: boolean;
  initValue?: Date;
  onClose?: any;
  onReturnResult?: any;
}
