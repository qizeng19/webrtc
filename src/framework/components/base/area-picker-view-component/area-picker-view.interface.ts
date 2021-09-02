import { OpenProvinceInfoResult } from '~/solution/model/dto/area.dto';

/**
 * @export state变量定义和初始化
 * @class IAreaPickerViewState
 */
export class IAreaPickerViewState {
  provinceList: Array<OpenProvinceChangeInfoResult> = new Array<OpenProvinceChangeInfoResult>();
  currentCityList: Array<OpenProvinceChangeInfoResult> = new Array<OpenProvinceChangeInfoResult>();
  value: Array<string>;
}

export interface OpenProvinceChangeInfoResult {
  label: string;
  value: string;
  children?: Array<OpenProvinceChangeInfoResult>;
}

export interface IAreaPickerViewProps {
  visible: boolean;
  initValue?: string;
  onClose?: any;
  onReturnResult?: any;
}
