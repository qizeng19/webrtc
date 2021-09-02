import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Toast } from 'antd-mobile';
import { StorageUtil } from '~framework/util/storage';

const WECHATH5_PAY_URL = 'pay/weChatH5PayContract'; // h5
const WECHATH5_JS_PAY_URL = 'pay/WeChatJsApiPayContract'; //微信公众号内支付
const ORDER_CREATE_URL = '';
const ORDER_ZERO_PAY_URL = '';
abstract class WechatH5PayDTO {
  abstract createOrder(params: IWechatOrder): Observable<string>;
  abstract getPayUrl(params: IWechatPayUrLParams): Observable<IWechatPayResult>;
  abstract goPay(redirectUrl: string, res: IWechatPayResult): void;
  abstract handlePay(params: IWechatOrder): void;
}

@DepUtil.Injectable()
class WechatH5Pay extends WechatH5PayDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  public readonly regExpRule: RegExp = /fch/;
  constructor() {
    super();
  }
  // 创建系统内部订单
  createOrder(params: IWechatOrder): Observable<string> {
    return this.requestService.post(ORDER_CREATE_URL, params);
  }
  // 微信支付h5下单
  getPayUrl(params: IWechatPayUrLParams): Observable<IWechatPayResult> {
    return this.requestService.post(WECHATH5_PAY_URL, params);
  }
  // 微信公众号下单
  getPayUrlInt(params: IWechatPayUrLParams): Observable<IWechatPayResult> {
    return this.requestService.post(WECHATH5_JS_PAY_URL, params);
  }
  // 跳转支付
  goPay(redirectUrl: string, res: IWechatPayResult): void {
    const appSchema =
      StorageUtil.getLocalStorage('APP_SOURCE') !== 'xxx' ? process.env.SCHEMA_A : process.env.SCHEMA_B;
    const platform = this.getPlatform().plantform || true;
    const isWx = this.getPlatform().isWx || false;
    redirectUrl = location.origin + process.env.HASH_URL + redirectUrl;
    platform !== 'Android' ? (redirectUrl = appSchema + redirectUrl) : '';
    // 如果在微信内置浏览器内则直接唤起支付无需跳转
    if (isWx) {
      window.WeixinJSBridge &&
        window.WeixinJSBridge.invoke(
          'getBrandWCPayRequest',
          {
            appId: res.appId,
            timeStamp: res.timeStamp,
            nonceStr: res.nonceStr,
            package: `prepay_id=${res.prepayId}`,
            signType: res.signType,
            paySign: res.paySign
          },
          function(resp: { err_msg: string }) {
            Toast.hide();
            if (resp.err_msg == 'get_brand_wcpay_request:ok') {
              Toast.loading('支付成功，请稍后');
              window.location.replace(redirectUrl);
            } else {
              Toast.fail('支付失败');
            }
          }
        );
      return;
    }
    // 微信浏览器外跳转支付
    const url = res.mweb_url + (redirectUrl && '&redirect_url=' + encodeURIComponent(redirectUrl));
    console.log('去支付', url);
    location.href = url;
  }
  // 创建订单支付
  handlePay(params: IWechatOrder, redirectUrl?: string): void {
    this.createOrder(params).subscribe(resp => {
      //微信公众号支付
      if (this.getPlatform().isWx || false) {
        this.getPayUrlInt({ amount: params.amount, targetId: resp }).subscribe(res => {
          this.goPay(redirectUrl, res);
        });
        return;
      }
      this.getPayUrl({ amount: params.amount, targetId: resp }).subscribe(res => {
        this.goPay(redirectUrl, res);
      });
    });
  }
  // 无需创建订单支付(系统已有订单)
  handleHasOrderIdPay(params: IWechatPayUrLParams, redirectUrl?: string): void {
    if (this.getPlatform().isWx || false) {
      this.getPayUrl({ amount: params.amount, targetId: params.targetId }).subscribe(res => {
        this.goPay(redirectUrl, res);
      });
      return;
    }
    this.getPayUrl({ amount: params.amount, targetId: params.targetId }).subscribe(res => {
      this.goPay(redirectUrl, res);
    });
  }
  // 零元支付
  handleZeroPay(targetId: string) {
    return this.requestService.post(ORDER_ZERO_PAY_URL, { orderId: targetId });
  }
  // 内置平台判断
  getPlatform() {
    const ua = navigator.userAgent;
    const isAndroid = ua.match(/android/i);
    const isIos = ua.match(/(iPhone|iPod|iPad);?/i);
    const isWx = ua.toLowerCase().match(/MicroMessenger/i);
    return {
      plantform: isAndroid ? 'Android' : isIos ? 'IOS' : 'Unknown',
      isWx
    };
  }
}

// 创建系统内部订单InterFace
interface IWechatOrder {
  type: number;
  userId: string;
  productId: string;
  amount: number;
  vehicleId: string;
}

// 创建WechatH5支付订单Interface
interface IWechatPayUrLParams {
  ip?: string;
  openId?: string;
  amount?: number;
  targetId: string;
  body?: string;
  playAgentTempId?: string;
}

// 响应WechatH5支付订单Interface
interface IWechatPayResult {
  timeStamp: string;
  nonceStr: string;
  package: string;
  signType: string;
  paySign: string;
  prepayId: string;
  appId: string;
  sp_billno: string;
  mweb_url: string;
}

export default class FchPay {
  WechatH5Pay = new WechatH5Pay();
}
