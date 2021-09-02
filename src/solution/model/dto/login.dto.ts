import { Observable } from 'rxjs';

export abstract class LoginDTO {
  // 登录
  abstract login(params: LoginRequest): Observable<string>;
  abstract bindPhone(params: BindRequest): Observable<string>;
  abstract sendCheckCode(phoneNumber: string): Observable<SendCheckCodeResult>;
  abstract getUserInfo(): Observable<GetUserInfoResult>;
  abstract getWechatInfo(code: string): Observable<string>;
}

export interface LoginRequest {
  phone: string;
  code: string;
  requestId: string;
}
export interface BindRequest {
  phone: string;
  code: string;
  requestId: string;
  openId: string;
}

export interface SendCheckCodeResult {
  message: string;
  requestId: string;
  bizId: string;
  code: string;
}
export interface GetUserInfoResult {
  id: string;
  phone: string;
  nikeName: string;
  image: string;
  createTime: string;
  lastUpdateTime: string;
}
