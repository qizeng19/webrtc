import { IISelectVehicleTypeState, IISelectVehicleTypeProps } from './i-select-vehicle-type.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Toast } from 'antd-mobile';
import { ISelectVehicleTypeService } from '~/solution/model/services/i-select-vehicle-type.service';
import { useEffect } from 'react';

export function useISelectVehicleTypeStore(props: IISelectVehicleTypeProps) {
  const { state, setStateWrap } = useStateStore(new IISelectVehicleTypeState());
  const iSelectVehicleTypeService: ISelectVehicleTypeService = new ISelectVehicleTypeService();

  useEffect(() => {
    getVehicleBrand();
  }, []);

  //选择车辆品牌
  function selectVehicleBrand($event: any) {
    setStateWrap({
      selectedBrandItem: $event,
      brandName: $event.name,
      selectedFactoryItem: {},
      selectedVersionItem: {},
      selectedConfigItem: {}
    });

    if ($event.code) {
      getVehicleFactory($event.code);
    } else {
      returnResult();
    }
  }

  //获取车辆型号列表
  function getVehicleFactory(code: string) {
    // Toast.loading('loading');
    iSelectVehicleTypeService
      .vehicleFactory({
        code: code
      })
      .subscribe(res => {
        if (res && res.length) {
          setStateWrap({
            factoryList: res,
            isShowFactoryDraw: true,
            isShowEmptyTitle: true
          });
        } else {
          returnResult();
        }
      });
  }

  //返回结果
  function returnResult(istate?: IISelectVehicleTypeState) {
    const { selectedBrandItem, selectedFactoryItem, selectedVersionItem, selectedConfigItem } = istate || state;
    let returnVehicleInfo = '';
    const obj = {
      selectedBrandItem: selectedBrandItem,
      selectedFactoryItem: selectedFactoryItem,
      selectedVersionItem: selectedVersionItem,
      selectedConfigItem: selectedConfigItem
    };

    Object.keys(obj).map((ele: any, index: number) => {
      if (obj[ele].value) {
        returnVehicleInfo += `${index ? '/' : ''}${obj[ele].value}`;
      }
    });

    props.onReturnResult(returnVehicleInfo);
  }

  //获取车辆品牌列表
  function getVehicleBrand() {
    // Toast.loading('loading', 1);
    // this.selectVehicleTypeService.vehicleBrand({})
    iSelectVehicleTypeService.simplevehicleBrand({}).subscribe(res => {
      Toast.hide();
      setStateWrap({
        brandList: res
      });
    });
  }

  // 选择车辆型号
  function selectVehicleType(data: any) {
    setStateWrap({
      selectedFactoryItem: data,
      selectedVersionItem: {},
      selectedConfigItem: {}
    });
    if (data.code) {
      getVehicleVersion(data.code);
    } else {
      returnResult();
    }
  }

  //获取车辆系列列表
  function getVehicleVersion(code: string) {
    // Toast.loading('loading');
    iSelectVehicleTypeService
      .vehicleVersion({
        code: code
      })
      .subscribe(res => {
        if (res && res.length) {
          setStateWrap({
            versionList: res,
            isShowVersionDraw: true,
            isShowEmptyTitle: false
          });
        } else {
          returnResult();
        }
      });
  }

  //选择系列
  function selectVehicleVersion(data: any) {
    setStateWrap({
      selectedVersionItem: data,
      selectedConfigItem: {}
    });
    if (data.key) {
      // this.getVehicleConfig(data.code);
      getVehicleConfig(data.key);
    } else {
      returnResult();
    }
  }

  //选择配置
  function selectVehicleConfig(data: any) {
    setStateWrap(
      {
        selectedConfigItem: data
      },
      (state: IISelectVehicleTypeState) => {
        returnResult(state);
      }
    );
  }

  //关闭选择系列页面
  function closeVersionDraw() {
    setStateWrap({
      isShowVersionDraw: false,
      isShowEmptyTitle: true
    });
    getVehicleFactory(state.selectedBrandItem.code);
  }

  //关闭选择配置页面
  function closeConfigDraw() {
    setStateWrap({
      isShowConfigDraw: false
    });
  }

  //到选择品牌页面
  function toSelBrand() {
    setStateWrap({
      isShowFactoryDraw: false,
      isShowVersionDraw: false,
      isShowConfigDraw: false
    });
  }

  //到选择车型页面
  function toSelType() {
    setStateWrap({
      isShowFactoryDraw: true,
      isShowEmptyTitle: true,
      isShowVersionDraw: false,
      isShowConfigDraw: false
    });
    getVehicleFactory(state.selectedBrandItem.code);
  }

  //到选择车辆系列页面
  function toSelDisplacement() {
    setStateWrap({
      isShowVersionDraw: true,
      isShowConfigDraw: false
    });
  }
  function closeFactory($event: string) {
    setStateWrap({
      [$event]: false
    });
  }

  //获取车辆配置列表
  function getVehicleConfig(key: string) {
    // Toast.loading('loading');
    iSelectVehicleTypeService
      .vehicleConfig({
        id: key
      })
      .subscribe(res => {
        if (res && res.length) {
          setStateWrap({
            configList: res,
            isShowConfigDraw: true
          });
        } else {
          returnResult();
        }
      });
  }
  return {
    state,
    selectVehicleBrand,
    getVehicleBrand,
    closeFactory,
    toSelDisplacement,
    toSelType,
    toSelBrand,
    closeConfigDraw,
    closeVersionDraw,
    selectVehicleConfig,
    selectVehicleVersion,
    selectVehicleType,
    returnResult
  };
}
