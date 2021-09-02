import * as React from 'react';
import { PickerView, Modal } from 'antd-mobile';
import { useAreaPickerViewStore } from './area-picker-view.component.store';
import { IAreaPickerViewProps } from './area-picker-view.interface';
import style from './area-picker-view.component.less';

export default function AreaPickerViewComponent(props: IAreaPickerViewProps) {
  const { state, onChange, returnChooseResult } = useAreaPickerViewStore(props);
  const { provinceList, value } = state;
  const { visible, onClose } = props;

  function sidebar() {
    return (
      <div>
        <div className={style.amPickerPopupHeader}>
          <div className={`${style.amPickerPopupItem}`} onClick={onClose}>
            取消
          </div>
          <div className={`${style.amPickerPopupItem} ${style.amPickerPopupTitle}`}></div>
          <div className={`${style.amPickerPopupItem} ${style.amPickerPopupHeaderRight}`} onClick={returnChooseResult}>
            确定
          </div>
        </div>
        <PickerView onChange={onChange} cols={2} value={value} data={provinceList} />
      </div>
    );
  }
  return (
    <Modal popup visible={visible} onClose={onClose} animationType="slide-up">
      {sidebar()}
    </Modal>
  );
}
