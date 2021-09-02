/**
 * @export state变量定义和初始化
 * @class IIndexListState
 */
export class IIndexListState {}

export interface IIndexListProps {
  list: Array<IndexList>;
  selectVehicleBrand: Function;
}

export interface IndexList {
  title: string;
  key: string;
  items: Item[];
}

export interface Item {
  name: string;
  key: string;
}
