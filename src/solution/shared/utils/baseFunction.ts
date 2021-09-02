// import { message } from 'antd';
import { StorageUtil } from '~/framework/util/storage';
import { useContext, useState, useCallback } from 'react';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { Modal } from 'antd-mobile';
import { ShopLocationService } from '~/solution/model/services/location.service';
declare const AMap: any;
const shopLocationService = new ShopLocationService();
export const CommonUtil = {
  downFile: (data: string, filename: string) => {
    const blob = CommonUtil.base64ToBlob(data);
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', objectUrl);
    a.setAttribute('download', decodeURI(filename));
    a.click();
    URL.revokeObjectURL(objectUrl);
  },
  base64ToBlob(code: string) {
    const parts = code.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;

    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  },
  fixIosScroll: (e: any) => {
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
    function closest(el: any, selector: any) {
      const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
      while (el) {
        if (matchesSelector.call(el, selector)) {
          return el;
        }
        el = el.parentElement;
      }
      return null;
    }
  },
  checkVehicleFrameNumber: (value: string) => {
    const vehicleFrameNumberReg = /^[A-Za-z0-9]{17}$/;
    if (value && vehicleFrameNumberReg.test(value.trim())) {
      return '请输入正确格式的车架号';
    }
    return '';
  },
  checkIsEmpty: (value: any) => {
    return !!value;
  },
  checkImageIsComplete: (value: Array<any>) => {
    const state = value.every(function(item: any) {
      return !!item.imageUrl;
    });
    return state;
  },
  checkAmount: (value: any, minAmount?: number) => {
    const amountReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    if (amountReg.test(value)) {
      if (minAmount && value < minAmount) {
        return '';
      }
      return '请输入正确格式的定损金额';
    }

    return '';
  },
  checkVehicleNumber: (vehicleNumber: string, justCheckReg: boolean, checkEmpty: boolean) => {
    // 可选只check格式
    const express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Za-z]{1}[A-Za-z0-9]{4,5}[A-Za-z0-9挂学警港澳使领]{1}$/;
    let message = '';
    if (!vehicleNumber.trim() || !justCheckReg) {
      checkEmpty ? (message = '车牌号不能为空') : (message = '');
    } else if (!express.test(vehicleNumber.trim())) {
      message = '请输入正确的车牌号';
    }
    return !message;
  },

  checkIsError: (object: any, state: any) => {
    let message = '';
    Object.keys(object).forEach((key: string) => {
      if (!message) {
        const value = object[key];
        // 如果是嵌套格式需要递归调用
        if (Array.isArray(value)) {
          message = CommonUtil.checkIsError(value[0], state[key]);
        } else {
          if (!value.checkFunction(state[key])) {
            message = value.message;
          }
        }
      }
    });
    return message;
  },
  getQueryString: (url: string, name: string) => {
    //匹配指定name的QueryString
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const r = url.match(reg);
    if (r != null) {
      return unescape(r[2]); //用于解码"="后的值,即$2
    }
    return null;
  },
  setTokenFromUrl: (url: string, name: string) => {
    StorageUtil.setLocalStorage('TOKEN', CommonUtil.getQueryString(url, name));
  },
  urlParam: (search: string) => {
    const param = {};
    search.replace(/([^&=?]+)=([^&]+)/g, (m, $1, $2) => (param[$1] = $2));
    return param;
  },
  getCurrentUserLocation: async (map?: any) => {
    const ua = navigator.userAgent.toLowerCase();
    const isIOS = window.isAppWebView === 'iOS';
    console.log('ua', ua.match(/MicroMessenger/i));
    if (window.isAppWebView) {
      await CommonUtil.initialNativeMap(isIOS, map);
    } else if (ua.match(/MicroMessenger/i)) {
      console.log('ua', ua.match(/MicroMessenger/i));

      // 获取当前页面的配置信息，并上传
      const url = encodeURIComponent(window.location.href.split('#')[0]);
      return new Promise(resolve => {
        shopLocationService.getCurrentWXConfig(url).subscribe(res => {
          console.log(res);
          wx.config({
            debug: false,
            appId: res.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature, // 必填，签名，见附录1
            jsApiList: ['getLocation']
          });
          wx.ready(function() {
            wx.getLocation({
              type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function(res: any) {
                if (res.errMsg == 'getLocation:ok') {
                  resolve({ position: { lng: res.longitude, lat: res.latitude } });
                } else {
                  resolve({ position: { lng: 0, lat: 0 } });
                }
              }
            });
          });
        });
      });
    } else {
      return CommonUtil.initialGaodeMap(map);
    }
  },
  initialNativeMap: async (isIOS: boolean, map: any) => {
    try {
      if (isIOS) {
        window.webkit.messageHandlers.getCurrentLocation.postMessage(null);
      } else {
        window.czb.loactionHandle();
      }
      return false;
    } catch (e) {
      return CommonUtil.initialGaodeMap(map);
    }
  },
  initialGaodeMap: (map?: any) => {
    if (!map) {
      map = new AMap.Map('map');
    }
    return new Promise(resolve => {
      map.plugin('AMap.Geolocation', () => {
        const geolocation = new AMap.Geolocation();
        let returnInfo: any = '';
        geolocation.getCurrentPosition((status: string, result: any) => {
          if (status == 'complete') {
            returnInfo = result;
          } else {
            returnInfo = { position: { lng: 30.634881, lat: 103.977047 } };
            console.log('定位失败');
          }
          resolve(returnInfo);
        });
      });
    });
  },
  // 客服电话
  customerServiceModal: (tel: string) => {
    Modal.alert('客服电话', tel, [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '拨号',
        onPress: () => {
          location.href = `tel:${tel}`;
        }
      }
    ]);
  },
  checkAndOpenModal(isOpen: boolean) {
    const isIOS = window.isAppWebView === 'iOS';
    if (window.isAppWebView) {
      if (isIOS) {
        window.webkit.messageHandlers.goBack.postMessage(isOpen);
      } else {
        window.movingSticker.goBack(isOpen);
      }
    }
  },
  useForceUpdate(): () => void {
    const [, dispatch] = useState<{}>(Object.create(null));
    // Turn dispatch(required_parameter) into dispatch().
    const memoizedDispatch = useCallback((): void => {
      dispatch(Object.create(null));
    }, [dispatch]);

    return memoizedDispatch;
  }
};
