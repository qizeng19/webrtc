/**
 * @export state变量定义和初始化
 * @class ILoginState
 */
export class ILoginState {
  requestId: string;
  phonenumber: string;
  verificationCode: string;
  test = 1;
  hasError = false;
  value = '';
  waitTime = 60;
  showLogin = false;
}
