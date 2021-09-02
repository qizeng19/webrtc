import { IInputBoxState, IInputBoxProps } from './input-box.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { EventBus } from '~/solution/shared/utils/event';
import { Toast } from 'antd-mobile';
const isIOS = window.isAppWebView === 'iOS';
export function useInputBoxStore(props: IInputBoxProps) {
  const { state, setStateWrap } = useStateStore(new IInputBoxState());
  /**
   * @description 模态框显示隐藏控制
   * @param e
   * */
  function handleBind() {
    if (window.isAppWebView && props.modalType == 'vehicle') {
      init();
      try {
        if (isIOS) {
          window.webkit.messageHandlers.ChoiceVehicle.postMessage(null);
        } else {
          window.movingSticker.ChoiceVehicle();
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      setStateWrap({ visible: !state.visible });
    }
  }

  function init() {
    const eventBus = new EventBus();
    window.eventBus = eventBus;
    eventBus.subscribe(handleCarTop.bind(null));
  }

  function handleCarTop(option: { type: string; message: any }) {
    const { type, message } = option;

    if (type === 'getBrand' && message) {
      props.valueChange(message);
    } else {
      Toast.fail('获取车辆类型错误');
    }
  }

  return {
    state,
    handleBind
  };
}
