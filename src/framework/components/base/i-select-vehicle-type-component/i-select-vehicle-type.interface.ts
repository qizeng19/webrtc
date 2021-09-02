import { IndexList } from '../index-list-component/index-list.interface';

/**
 * @export state变量定义和初始化
 * @class IISelectVehicleTypeState
 */
export class IISelectVehicleTypeState {
  isShowFactoryDraw = false;
  isShowVersionDraw = false;
  isShowConfigDraw = false;
  isShowEmptyTitle = false;
  brandList = [] as any;
  brandName = '';
  factoryList = [] as any;
  versionList = [] as any;
  configList = [] as any;
  selectedBrandItem = {} as any;
  selectedFactoryItem = {} as any;
  selectedVersionItem = {} as any;
  selectedConfigItem = {} as any;
}

export interface IISelectVehicleTypeProps {
  list?: Array<IndexList>;
  onReturnResult: Function;
  isShowVehicleModal: boolean;
  onCloseVehicleModal: Function;
}
