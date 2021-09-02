/**
 * @export state变量定义和初始化
 * @class IDemoState
 */
export class IDemoState {
  dataLoading: boolean;
  notHaveMore: boolean;
  isNoInfo = false;
  images = [{ id: '1', imageUrl: require('~assets/image/car.png') }];
}
