import * as React from 'react';
import style from './input-box.component.less';
import { IInputBoxProps } from './input-box.interface';
import LicenseKeyboard from 'vehicle-plate-keyboard';
import 'vehicle-plate-keyboard/dist/main.css';
import { useInputBoxStore } from './input-box.component.store';
import {
  ISelectVehicleTypeComponent,
  IDrawerComponent,
  LocationSelectComponent
} from '~/framework/components/component.module';
import AreaPickerViewComponent from '../area-picker-view-component/area-picker-view.component';
import AccidentAddressComponent from '../../unit/accident-address-component/accident-address.component';
import IChooseDateComponent from '../i-choose-date-component/i-choose-date.component';
function InputBoxComponent(props: IInputBoxProps) {
  const {
    inputTitle,
    inputPlaceholder,
    inputValue = '',
    valueChange,
    isRequire,
    type = 'text',
    modalType,
    editAble = true,
    otherParams,
    showBorder = true
  } = props;

  const { state, handleBind } = useInputBoxStore(props);
  const { visible } = state;
  function renderPlateNumberComponent() {
    switch (modalType) {
      case 'locationSelect':
        return (
          visible && (
            <LocationSelectComponent
              visible={visible}
              onChange={(val: any) => {
                valueChange(val);
              }}
              id={otherParams.id}
              vehicleFrameNumber={otherParams.vehicleFrameNumber}
              value={inputValue}
              done={handleBind}
            />
          )
        );
      case 'datePicker':
        return (
          visible && (
            <IChooseDateComponent
              visible={visible}
              initValue={inputValue || new Date()}
              onReturnResult={(obj: string) => {
                valueChange(obj);
                handleBind();
              }}
              onClose={handleBind}
            />
          )
        );
      case 'plateNumber':
        return (
          <LicenseKeyboard
            visible={visible}
            onChange={(val: any) => {
              valueChange(val);
            }}
            value={inputValue}
            done={handleBind}
          />
        );
      case 'vehicle':
        return visible ? (
          <ISelectVehicleTypeComponent
            isShowVehicleModal={visible}
            onCloseVehicleModal={handleBind}
            onReturnResult={(obj: string) => {
              valueChange(obj);
              handleBind();
            }}
          ></ISelectVehicleTypeComponent>
        ) : null;
      case 'area':
        return visible ? (
          <AreaPickerViewComponent
            visible={visible}
            onClose={handleBind}
            onReturnResult={(obj: string) => {
              valueChange(obj);
              handleBind();
            }}
          ></AreaPickerViewComponent>
        ) : null;
      case 'accidentArea':
        return visible ? (
          <IDrawerComponent show={visible} width="100%">
            <AccidentAddressComponent
              goBack={handleBind}
              chooseAccidentAddress={(obj: string) => {
                valueChange(obj);
                handleBind();
              }}
            ></AccidentAddressComponent>
          </IDrawerComponent>
        ) : null;
      default:
        return null;
    }
  }

  return (
    <>
      <div className={style.inputBox}>
        <div className={`${style.inputBoxItem} ${showBorder && style.border}`} onClick={handleBind}>
          <label htmlFor="inputVal">
            {inputTitle}
            <span className={style.require} dangerouslySetInnerHTML={{ __html: isRequire ? '&nbsp;*' : '' }}></span>
          </label>
          <div className={style.wrapSelect}>
            <input
              type={type}
              id="inputVal"
              placeholder={inputPlaceholder}
              value={inputValue}
              readOnly={!!modalType}
              onChange={(e: any) => {
                console.log(e);
                editAble ? valueChange(e.target.value) : valueChange('');
              }}
            />
            {modalType && modalType != 'plateNumber' && (
              <div className={style.wrapImg}>
                <img src={require('~assets/image/right-select.png')} />
              </div>
            )}
          </div>
        </div>
      </div>
      {renderPlateNumberComponent()}
    </>
  );
}

export default React.memo(InputBoxComponent);
