import { LoginDTO, LoginRequest, SendCheckCodeResult, GetUserInfoResult, BindRequest } from '../dto/login.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
const LOGIN_PATH = '';
const BIND_PHONE_PATH = '';
const SEND_CHECK_CODE = '';
const GET_USER_INFO = '';
const GET_WECHAT_INFO = '';

@DepUtil.Injectable()
export class LoginService extends LoginDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  // 登录
  login(params: LoginRequest): Observable<string> {
    return this.requestService.post(LOGIN_PATH, params);
  }

  // 获取验证码
  sendCheckCode(phoneNumber: string): Observable<SendCheckCodeResult> {
    return this.requestService.get(SEND_CHECK_CODE, { phoneNumber });
  }
  // 获取用户信息
  getUserInfo(): Observable<GetUserInfoResult> {
    return this.requestService.get(GET_USER_INFO);
  }
  // 获取微信用户信息，如果有则登录没有绑定手机号
  getWechatInfo(code: string): Observable<string> {
    return this.requestService.get(GET_WECHAT_INFO, { code });
  }
  // 微信绑定手机号
  bindPhone(params: BindRequest): Observable<string> {
    return this.requestService.post(BIND_PHONE_PATH, params);
  }
}
