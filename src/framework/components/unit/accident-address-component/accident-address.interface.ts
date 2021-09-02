/**
 * @export state变量定义和初始化
 * @class IAccidentAddressState
 */
export class IAccidentAddressState {
  addressList: Array<AddressItem> = [];
}

export interface AddressItem {
  name: string; // 详细地址
  address: string; // 大概街道
  id: string;
}

export interface IAccidentAddressProps {
  goBack?: (event: any) => void;
  chooseAccidentAddress: (event: any) => void;
}
