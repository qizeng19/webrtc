import * as React from 'react';
import { IProps } from './lazyload-loading.interface';
import style from './lazyload-loading.component.less';

export default class LazyloadLoadingComponent extends React.Component<IProps> {
  render() {
    return (
      <div>
        <div className={style.loadingInfo}>
          <div className={style.blob}></div>
        </div>
      </div>
    );
  }
}
