import * as React from 'react';
import style from './no-info.component.less';

export default function NoInfoComponent() {
  return (
    <div className={style.noInfo}>
      <img src={require('~/solution/assets/image/empty.png')} alt="" />
      <div className={style.noInfoDesc}>暂无记录</div>
    </div>
  );
}
