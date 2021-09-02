/**
 * @export state变量定义和初始化
 * @class IIDrawerState
 */
export class IIDrawerState {
  animShow = false;
  _show = false;
  onClose: Function = () => {};
}

export interface IIDrawerProps {
  show: boolean;
  mask?: boolean;
  width?: string;
  right?: string;
  zIndex?: number;
  height?: string;
  className?: string | Array<string>;
  onClose?: Function;
  children?: any;
  buttom?: boolean;
  top?: boolean;
  left?: boolean;
}
