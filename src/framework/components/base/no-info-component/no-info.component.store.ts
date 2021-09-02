import { INoInfoState } from './no-info.interface';
import { useStateStore } from '~/framework/aop/hooks/base-store';

export function useNoInfoStore() {
    const { state, setStateWrap } = useStateStore(new INoInfoState());
    return { state }
}