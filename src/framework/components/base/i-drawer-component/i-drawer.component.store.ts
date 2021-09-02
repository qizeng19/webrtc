import { IIDrawerState, IIDrawerProps } from './i-drawer.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';

export function useIDrawerStore(props: IIDrawerProps) {
  const { state, setStateWrap } = useStateStore(new IIDrawerState());
  //   function onMaskClick() {
  //     animHide();
  //   }

  useEffect(() => {
    props.show && animShow();
  }, []);

  function animShow(): void {
    setStateWrap({ animShow: true });
  }

  function onMaskClick() {
    animHide();
  }

  function animHide(): void {
    setStateWrap({
      animShow: false
    });
    onHide();
  }

  function onHide(): void {
    props.onClose && props.onClose();
  }
  return { state, onMaskClick };
}
