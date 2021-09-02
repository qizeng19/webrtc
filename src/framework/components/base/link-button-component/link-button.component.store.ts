import { ILinkButtonState } from './link-button.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useLinkButtonStore() {
    const { state, setStateWrap } = useStateStore(new ILinkButtonState());
    return { state }
}