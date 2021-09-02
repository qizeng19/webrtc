import { ILicensePlateNumberState } from './license-plate-number.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useLicensePlateNumberStore() {
  const { state, setStateWrap } = useStateStore(new ILicensePlateNumberState());
  /**
   * @description 删除输入项
   * @param callback
   */
  function handleRemove(callback: Function) {
    return (e: any) => {
      e.stopPropagation();
      let { plateNumber } = state;
      plateNumber = plateNumber.substring(0, plateNumber.length - 1);
      if (plateNumber.length === 0) {
        setStateWrap({ clickType: 0 });
      }
      setStateWrap(
        {
          plateNumber
        },
        (state: any) => {
          callback(state.plateNumber);
        }
      );
    };
  }

  /**
   * @description 车牌号改变
   * @param e
   * @param callback
   */
  function handleAdd(e: any, callback: Function) {
    return (event: any) => {
      event.stopPropagation();
      let { plateNumber } = state;
      if (!plateNumber || plateNumber.length < 8) {
        if (!plateNumber && plateNumber !== ' ') {
          setStateWrap({ clickType: 1 });
        }
        if (plateNumber !== null) {
          plateNumber += e;
        } else {
          plateNumber = e;
        }
        setStateWrap({
          plateNumber
        });
        callback(plateNumber);
      }
    };
  }

  /**
   * @description 模态框中英文切换控制
   * @param flag
   */
  function handleModalChange(flag: any) {
    return (e: any) => {
      e.stopPropagation();
      if (flag === 'ABC') {
        setStateWrap({ clickType: 1 });
      } else {
        setStateWrap({ clickType: 0 });
      }
    };
  }

  return {
    state,
    handleRemove,
    handleAdd,
    handleModalChange
  };
}
