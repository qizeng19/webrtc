import { IIndexListState, Item, IIndexListProps } from './index-list.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useIndexListStore(props: IIndexListProps) {
  const { state, setStateWrap } = useStateStore(new IIndexListState());
  function onSelectIndexContent(item: Item) {
    props.selectVehicleBrand(item);
  }
  return { state, onSelectIndexContent };
}
