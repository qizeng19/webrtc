import * as React from 'react';
import style from './accident-address.component.less';
import BackNavBarComponent from '../../base/back-nav-bar-component/back-nav-bar.component';
import { IAccidentAddressProps, AddressItem } from './accident-address.interface';
import { useAccidentAddressStore } from './accident-address.component.store';
import { CommonUtil } from '~/solution/shared/utils/baseFunction';

export default function AccidentAddressComponent(props: IAccidentAddressProps) {
  const { state } = useAccidentAddressStore();
  const { addressList } = state;
  const { goBack, chooseAccidentAddress } = props;
  function addressItem(addressItemInfo: AddressItem) {
    return (
      <div
        className={style.addressItem}
        key={addressItemInfo.id}
        onClick={() => {
          chooseAccidentAddress(addressItemInfo);
          CommonUtil.checkAndOpenModal(true);
        }}
      >
        <div className={style.headerAddress}>
          <img src={require('~assets/image/location-icon.png')} alt="" />
          {addressItemInfo.name}
        </div>
        <span> {addressItemInfo.address} </span>
      </div>
    );
  }
  return (
    <div>
      <BackNavBarComponent navText="事故地点选择" goBack={goBack} cancle={true} isModal={true}></BackNavBarComponent>
      <div id="container" className={style.gaodeMap}></div>
      <div className={style.addressList}>
        {addressList && addressList.length
          ? addressList.map(addressItemInfo => {
              return addressItem(addressItemInfo);
            })
          : null}
      </div>
    </div>
  );
}
