import * as React from 'react';
import style from './i-choose-date.component.less';
import { Modal, DatePickerView } from 'antd-mobile';
import { IIChooseDateProps } from './i-choose-date.interface';
import { useIChooseDateStore } from './i-choose-date.component.store';
import dayjs from 'dayjs';
export default function IChooseDateComponent(props: IIChooseDateProps) {
  const { state, onChange, done } = useIChooseDateStore(props);
  const { visible, onClose = new Date() } = props;

  function sidebar() {
    return (
      <div>
        <div className={style.amPickerPopupHeader}>
          <div className={`${style.amPickerPopupItem}`} onClick={onClose}>
            取消
          </div>
          <div className={`${style.amPickerPopupItem} ${style.amPickerPopupTitle}`}></div>
          <div className={`${style.amPickerPopupItem} ${style.amPickerPopupHeaderRight}`} onClick={done}>
            确定
          </div>
        </div>

        <DatePickerView value={state.value} onChange={onChange} mode={'date'} minDate={new Date()} />
        {/* <PickerView onChange={onChange} cols={2} value={value} data={provinceList} /> */}
      </div>
    );
  }
  return (
    <Modal popup visible={visible} onClose={onClose} animationType="slide-up">
      {sidebar()}
    </Modal>
  );
}
