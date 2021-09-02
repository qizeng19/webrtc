import { ILocationSelectState } from './location-select.interface';
import { useEffect, useRef, useContext } from 'react';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { ShopLocationService } from '~/solution/model/services/location.service';
import { EventBus } from '~/solution/shared/utils/event';
import { CommonUtil } from '~/solution/shared/utils/baseFunction';
import { Toast } from 'antd-mobile';
import { LocationResultResponse, LocationResultParams } from '~/solution/model/dto/location.dto';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { TYPES } from '~/solution/context/global/store/global.type';

export function useLocationSelectStore(props: { id: string; vehicleFrameNumber: string }) {
  const { state, setStateWrap } = useStateStore(new ILocationSelectState());
  const shopService = new ShopLocationService();
  const forceUpdate = CommonUtil.useForceUpdate();
  const { gState, dispatch } = useContext(GlobalContext);
  const locationRef = useRef(null);
  const id = useRef(null);
  id.current = props.id;
  const vehicleFrameNumber = props.vehicleFrameNumber;
  console.log('vehicleFrameNumber', vehicleFrameNumber);
  useEffect(() => {
    // 获取当前定位
    getCurrentUserLocation();
  }, []);

  function init() {
    const eventBus = new EventBus();
    window.eventBus = eventBus;
    eventBus.subscribe(handleNativeLocation);
  }

  async function handleNativeLocation(option: { type: string; message: any }) {
    const { type, message } = option;
    if (type === 'location') {
      const location = message;
      if ((location && location.lat) || location.lng) {
        locationRef.current = location;
        getCurrentShopLocation();
      } else {
        console.log('Native 定位失败，启用 H5 定位');
        const result: any = await CommonUtil.initialGaodeMap();
        locationRef.current = result.position;
        getCurrentShopLocation();
      }
    }
  }

  async function getCurrentUserLocation() {
    Toast.loading('loading', 3000);
    if (gState.location) {
      const result = gState.location;
      locationRef.current = result.position || result;
      getCurrentShopLocation();
      return;
    }
    if (window.isAppWebView) {
      window.isAppWebView && init();
    }
    const result: any = await CommonUtil.getCurrentUserLocation();
    if (result) {
      locationRef.current = result.position || result;
      getCurrentShopLocation();
    }
  }

  function getCurrentShopLocation() {
    Toast.hide();
    if (locationRef.current) {
      dispatch({ type: TYPES.SET_LOCATION, payload: locationRef.current });
    }

    const { lng, lat } = locationRef.current;
    const userId = localStorage.getItem('userId');
    let params: LocationResultParams = {
      page: 1,
      size: 50,
      userId,
      vehicleId: id.current,
      vehicleFrameNumber,
      sortType: 1
    };
    if (locationRef.current) {
      params = { ...params, localLatitude: lat, localLongitude: lng };
    }
    shopService.getShopLocationList(params).subscribe((res: { data: Array<LocationResultResponse> }) => {
      //获取市的信息
      setTimeout(() => {
        setStateWrap({
          shopLocationList: res.data
        });
        forceUpdate();
      }, 0);
    });
  }
  return { state };
}
