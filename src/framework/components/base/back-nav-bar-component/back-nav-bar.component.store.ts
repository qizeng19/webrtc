import { IBackNavBarState, IBackNavBarProps } from './back-nav-bar.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { EventBus } from '~/solution/shared/utils/event';
import { Toast } from 'antd-mobile';
import { CommonUtil } from '~/solution/shared/utils/baseFunction';

export function useBackNavBarStore(props: IBackNavBarProps) {
  const { state } = useStateStore(new IBackNavBarState());
  const { handleDelete = () => {}, navText } = props;
  const history = useHistory();
  const location = useLocation();
  const searchUrlInfo = useRef(null);

  function goBackDefault() {
    history.goBack();
  }
  console.log('test1');

  useEffect(() => {
    window.isAppWebView && handleClickImg();
  }, []);

  function handleClickImg() {
    const eventBus = new EventBus();
    window.eventBus = eventBus;
    eventBus.subscribe((option: { type: string }) => handleDeleteButton(option));
  }

  function handleDeleteButton(option: { type: string }) {
    const { type } = option;

    switch (type) {
      case 'deleteVehicle':
        handleDelete();
        break;
      case 'close':
        goBack(null);
        break;
      default:
        break;
    }
  }
  return { state, goBackDefault };
}
