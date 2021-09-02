import { IAreaPickerViewState, OpenProvinceChangeInfoResult, IAreaPickerViewProps } from './area-picker-view.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { OpenProvinceInfoResult } from '~/solution/model/dto/area.dto';
import { AreaService } from '~/solution/model/services/area.service';

export function useAreaPickerViewStore(props: IAreaPickerViewProps) {
  const { state, setStateWrap } = useStateStore(new IAreaPickerViewState());
  const areaService = new AreaService();
  useEffect(() => {
    areaService.getOpenProvinceInfo().subscribe(async (res: Array<OpenProvinceInfoResult>) => {
      //获取市的信息
      const afterRes = dealWithData(res);
      await getCityInfoByProvinceCode(afterRes[0], afterRes);
    });
  }, []);

  function onChange(event: any) {
    // 监听是第一行的变化还是第二行的变化，并判断第二行的数据时候获取过
    const provinceList = [...state.provinceList];
    if (event[0]) {
      provinceList.forEach(async ele => {
        if (ele.value == event[0]) {
          if (!ele.children || !ele.children.length) {
            await getCityInfoByProvinceCode(ele, provinceList);
          } else {
            setStateWrap({
              value: event
            });
          }
        }
      });
    }
  }

  function returnChooseResult() {
    // 通过value 和 provinceList来获取地址详情
    const { value, provinceList } = state;
    const valueLength = value.length;
    const returnInfo: any = {
      title: [],
      value
    };
    provinceList.forEach(province => {
      if (province.value == value[0]) {
        returnInfo.title.push(province.label);
        if (valueLength >= 2) {
          province.children.forEach(city => {
            city.value == value[1] && returnInfo.title.push(city.label);
          });
        }
      }
    });
    props.onReturnResult && props.onReturnResult(returnInfo);
  }

  async function getCityInfoByProvinceCode(
    provinceInfo: OpenProvinceChangeInfoResult,
    provinceList: Array<OpenProvinceChangeInfoResult>
  ) {
    const value = await areaService.getCityInfoByProvinceCode({ provinceCode: provinceInfo.value }).toPromise();
    provinceInfo.children = dealWithData(value);
    setStateWrap({
      provinceList: [...provinceList],
      value: [provinceInfo.value, provinceInfo.children[0] ? provinceInfo.children[0].value : '']
    });
  }

  function dealWithData(res: Array<OpenProvinceInfoResult>) {
    const returnInfo: Array<OpenProvinceChangeInfoResult> = new Array<OpenProvinceChangeInfoResult>();
    res.forEach(ele => {
      const targetInfo: OpenProvinceChangeInfoResult = {
        label: '',
        value: ''
      };
      (targetInfo.label = ele.name), (targetInfo.value = ele.code);
      if (ele.children && ele.children.length) {
        targetInfo.children = dealWithData(ele.children);
      }
      returnInfo.push(targetInfo);
    });
    return returnInfo;
  }
  return { state, onChange, returnChooseResult };
}
