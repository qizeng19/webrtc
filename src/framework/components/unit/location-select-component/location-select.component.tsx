import * as React from 'react';
import style from './location-select.component.less';
import { Modal } from 'antd-mobile';
import { BackNavBarComponent } from '~/framework/components/component.module';
import { LocationResultResponse } from '~/solution/model/dto/location.dto';
import { CommonUtil } from '~/solution/shared/utils/baseFunction';
import { useLocationSelectStore } from './location-select.component.store';

export default function LocationSelectComponent(props: any) {
  const { visible, done, onChange } = props;

  const { state } = useLocationSelectStore(props);
  const { shopLocationList } = state;
  function closeModal(item: LocationResultResponse) {
    done();
    onChange(item);
    CommonUtil.checkAndOpenModal(false);
  }
  return (
    <Modal popup visible={visible} onClose={done} animationType="slide-up">
      <div className={style.shopList}>
        <BackNavBarComponent navText="选择" cancle={true} goBack={() => done()} isModal={true} />
        {shopLocationList.length
          ? shopLocationList.map(item => {
              return (
                <div className={style.aStore} key={item.id} onClick={() => closeModal(item)}>
                  <section>
                    <div className={style.storeName}>
                      <div className={style.wrapImg}>
                        <img src={require('~assets/image/coordinate-icon.png')} alt="" />
                      </div>
                      <span>{item.unitName}</span>
                    </div>
                    <div className={style.storeLocation}>
                      <span>{item.unitAddress}</span>
                      <span>{(item.distance / 1000).toFixed(2)}km</span>
                    </div>
                  </section>
                </div>
              );
            })
          : null}
      </div>
    </Modal>
  );
}
