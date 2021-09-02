import * as React from 'react';
import style from './back-nav-bar.component.less';
import { useBackNavBarStore } from './back-nav-bar.component.store';
import { PROJECT_TITLE } from '~/solution/shared/constant/common.const';
import { IBackNavBarProps } from './back-nav-bar.interface';

// import { NavBar, Icon } from 'antd-mobile';
const isIOS = window.isAppWebView === 'iOS';
export default function BackNavBarComponent(props: IBackNavBarProps) {
  const { goBackDefault } = useBackNavBarStore(props);
  const {
    navText = PROJECT_TITLE,
    goBack = goBackDefault,
    handleDelete = () => {},
    showDelete,
    isModal = false,
    showBack = true,
    cancle = false
  } = props;
  const ua = navigator.userAgent;
  const isWx = ua.toLowerCase().match(/miniprogram/i);
  if (isWx && navText != '选择预约门店' && navText != '事故地点选择') {
    document.title = navText;
    return null;
  }

  if (window.isAppWebView) {
    if (isIOS) {
      window.webkit.messageHandlers.setAppTitle.postMessage({ title: navText, isDelete: !!showDelete });
    } else {
      window.movingSticker.setAppTitle(navText, showDelete);
    }
    return null;
  }
  return (
    <div className={style.navBar}>
      <div className={style.navBarText}>{navText}</div>
      {showBack && (
        <div className={style.backBtn} onClick={goBack}>
          {!cancle && (
            <div className={style.wrapImg}>
              <img src={require('~assets/image/back-icon.png')} />
            </div>
          )}
          <span>{!cancle ? '返回' : '取消'}</span>
        </div>
      )}
      <div className={style.deleteBtn} onClick={handleDelete} style={{ display: showDelete ? 'inline-block' : 'none' }}>
        删除
      </div>
    </div>
  );
}
