import { LocationResultResponse } from '~/solution/model/dto/location.dto';

/**
 * @export state变量定义和初始化
 * @class ILocationSelectState
 */
export class ILocationSelectState {
  shopLocationList: Array<LocationResultResponse> = [];
  isLoading = false;
}
