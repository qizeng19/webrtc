/**
 * @export state变量定义和初始化
 * @class IIScrollState
 */
export class IIScrollState {
  isPullUpLoadLoading: boolean;
  isPullingDownLoading = true;
  isPullingDownLoadingStatus: boolean;
}

export interface IIScrollProps {
  children?: any;
  title?: string;
  // 默认true
  isPullingDown?: boolean;
  pullingDownHandle?: (callback: () => void) => void;
  // 默认false
  isPullUpLoad?: boolean;
  dataLoading?: boolean;
  pullUpLoadHandle?: (callback: () => void) => void;
  notHaveMore?: boolean;
  height?: string;
}
