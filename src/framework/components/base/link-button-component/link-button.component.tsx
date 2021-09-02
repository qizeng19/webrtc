import * as React from 'react';
import style from './link-button.component.less';

export default function LinkButtonComponent(props: any) {
  return (
    <div className={style.wrapLink}>
      <div className={style.linkBtn} onClick={props.handleClick}>
        {props.btnText}
      </div>
    </div>
  );
}
