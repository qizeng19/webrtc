import { IAccidentAddressState } from './accident-address.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef, useContext, useState } from 'react';
import { Toast } from 'antd-mobile';
import { CommonUtil } from '~/solution/shared/utils/baseFunction';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { EventBus } from '~/solution/shared/utils/event';
import { TYPES } from '~/solution/context/global/store/global.type';
declare const AMapUI: any;
declare const AMap: any;
export function useAccidentAddressStore() {
  const { state, setStateWrap } = useStateStore(new IAccidentAddressState());
  const placeSearchRef = useRef();
  const { gState, dispatch } = useContext(GlobalContext);
  const loadLocation = useRef(false);
  const forceUpdate = CommonUtil.useForceUpdate();
  const mapRef = useRef(null);
  const positionPicker = useRef(null);
  useEffect(() => {
    initCurrentSearch();
    initMap();
    window.isAppWebView && init();
  }, []);

  function init() {
    const eventBus = new EventBus();
    window.eventBus = eventBus;
    eventBus.subscribe(handleNativeLocation);
  }

  function initMap() {
    AMapUI.loadUI(['misc/PositionPicker'], async function(PositionPicker: any) {
      const map = new AMap.Map('container', {
        zoom: 16,
        scrollWheel: false
      });
      mapRef.current = map;
      Toast.loading('加载当前位置', 30000);
      // 获取当前位置
      await getUserLocation(map);
      // 初始化拖拽picker
      positionPicker.current = new PositionPicker({
        mode: 'dragMap',
        map: map,
        iconStyle: {
          //自定义外观
          url: '//webapi.amap.com/ui/1.0/assets/position-picker2.png',
          ancher: [24, 40],
          size: [48, 48]
        }
      });
      // 拖拽成功
      positionPicker.current.on('success', function(positionResult: any) {
        // 如果定义了placeSearch对象 并且 定位成功就可以一句这个位置进行搜索了
        if (loadLocation.current) {
          Toast.loading('加载地址列表', 30000);
          const current: any = placeSearchRef.current;
          current.search(positionResult.address, function(status: string, result: any) {
            if (status == 'complete') {
              setStateWrap({ addressList: result.poiList.pois });
              forceUpdate();
            }
            Toast.hide();
          });
        }
        // 调用PoiPicker
      });
      // 拖拽失败
      positionPicker.current.on('fail', function(positionResult: any) {
        console.log(positionResult);
      });
      // 时刻是开启的
      !window.isAppWebView && positionPicker.current.start();
    });
  }

  function initCurrentSearch(city = '成都') {
    AMap.plugin('AMap.PlaceSearch', function() {
      const autoOptions = {
        city
      };
      placeSearchRef.current = new AMap.PlaceSearch(autoOptions);
    });
  }

  async function getUserLocation(map: any) {
    const result = await CommonUtil.getCurrentUserLocation(map);
    console.log('result', result);
    if (!window.isAppWebView) {
      if (result) {
        mapCallbackFunction(map, result);
      } else {
        Toast.info('定位失败');
      }
    }
  }

  function mapCallbackFunction(map: any, result: any) {
    try {
      dispatch({ type: TYPES.SET_LOCATION, payload: result });
      const { lng, lat } = window.isAppWebView ? result : result.position;
      const current: any = placeSearchRef.current;
      current.setCity = window.isAppWebView ? '' : '成都';

      map.setCenter([lng, lat]);
      Toast.hide();
      loadLocation.current = true;
      window.isAppWebView && positionPicker.current.start();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleNativeLocation(option: { type: string; message: any }) {
    const { type, message } = option;

    if (type === 'location') {
      const location = message;
      if ((location && location.lat) || location.lng) {
        mapCallbackFunction(mapRef.current, location);
      } else {
        console.log('Native 定位失败，启用 H5 定位');
        const result = await CommonUtil.initialGaodeMap(mapRef.current);
        mapCallbackFunction(mapRef.current, result);
      }
    }
  }
  return { state };
}
