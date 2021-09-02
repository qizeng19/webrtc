declare module '*.less';
declare module '*.css';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare const wx: any;
declare interface Window {
  webkit:any,
  isWX: boolean;
  WeixinJSBridge:any,
  isAppWebView:any,
  statusBarHeight:any,
  eventBus:any,
  safeAreaHeight:any,
  isWX: any,

  czb:{
    startNavigate:(
      startLat:string,
      startLng:string,
      endLat:string,
      endLng:string,
    ) => {}
    loactionHandle:() => string,
    uploadImg:()=>string,
    navigationBack:any,
    invitationHandle:any,
    handleShare:any,
    vipCharge:() => void,
  },
  repair:{
    postMessage:(
      message:string
    ) => void
  },
  movingSticker:{
    jumpToAppPay:(
      id:string,
      payTotal:number
    ) => void,
    goBack: (isOpen: boolean) => void,
    setAppTitle: (title: string, isDelete: boolean) => void,
    callPhonePermission:() => void,
    // 选择地址
    chooseAddress:() => void,
    // 选择车型
    ChoiceVehicle:()=>void,
    backToApp: () => void
  } ,
  // 获取经纬度（调用原生方法）
  loactionHandle:() => string,
  // 上传图片
  uploadImg:()=>string,
  //领取加油补贴
  oil:{
    subsidies: (msg: any)=> void
  }
}