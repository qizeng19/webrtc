import * as React from 'react';
import style from './i-drawer.component.less';
import { IIDrawerProps } from './i-drawer.interface';
import { useIDrawerStore } from './i-drawer.component.store';

function IDrawerComponent(props: IIDrawerProps) {
  const { mask = true, right, height, show, width, zIndex = 999, children, buttom, top = true, left } = props;
  const { state, onMaskClick } = useIDrawerStore(props);
  const { animShow } = state;

  const maskStyle = {
    display: mask ? 'block' : 'none',
    opacity: animShow ? 1 : 0
  };

  const listStyle = {
    width,
    height,
    top: buttom ? 'auto' : '0',
    buttom: buttom ? '0' : 'auto',
    transition: animShow ? 'all 225ms cubic-bezier(0, 0, 0.2, 1)' : 'all 195ms cubic-bezier(0.4, 0, 0.6, 1)'
  };
  return show ? (
    <div
      className={`${style.iDrawer} ${animShow && style.iDrawerShow} ${right && style.iDrawerRight} ${left &&
        style.iDrawerLeft} ${buttom && style.iDrawerButtom}`}
      style={{ zIndex: zIndex }}
    >
      <div className={style.iDrawerMask} style={maskStyle} onClick={onMaskClick}></div>
      <div className={style.iDrawerContent} style={listStyle}>
        {children}
      </div>
    </div>
  ) : null;
}

export default React.memo(IDrawerComponent);
