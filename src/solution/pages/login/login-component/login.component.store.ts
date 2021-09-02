import { ILoginState } from './login.interface';
import { useEffect } from 'react';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Toast } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import { LoginService } from '~/solution/model/services/login.service';
import { StorageUtil } from '~/framework/util/storage';

let isLogin = true;
let openId = '';

export function useLoginStore() {
  const { state, setStateWrap } = useStateStore(new ILoginState());
  const loginService: LoginService = new LoginService();
  useEffect(() => {
    if (getPlatform().isWx) {
      getCode();
      isLogin = false;
      return;
    }
    setStateWrap({
      showLogin: true
    });
  }, []);
  const history = useHistory();
  function onErrorClick() {
    if (state.hasError) {
      Toast.info('Please enter 11 digits');
    }
  }
  function onChange(value: any) {
    if (value.replace(/\s/g, '').length < 11) {
      setStateWrap({
        hasError: true
      });
    } else {
      setStateWrap({
        hasError: false
      });
    }
    setStateWrap({
      value
    });
  }
  function handlePhoneChange($event: any) {
    setStateWrap({ phonenumber: $event.target.value });
  }
  function handleVerificationCodeChange($event: any) {
    setStateWrap({ verificationCode: $event.target.value });
  }
  // 获取验证码
  function getVerificationCode() {
    loginService.sendCheckCode(state.phonenumber).subscribe(res => {
      handleWaitTime();
      setStateWrap({ requestId: res.requestId });
    });
  }
  //
  function handleWaitTime() {
    let waitTime = 60;
    const TimeId = setInterval(function() {
      setStateWrap({ waitTime: waitTime - 1 });
      waitTime--;
      if (waitTime < 1) {
        clearInterval(TimeId);
        setStateWrap({ waitTime: 60 });
      }
    }, 1000);
  }
  function handleJoin() {
    if (isLogin) {
      loginService
        .login({
          phone: state.phonenumber,
          code: state.verificationCode,
          requestId: state.requestId
        })
        .subscribe(res => {
          StorageUtil.setLocalStorage('TOKEN', res);
          loginService.getUserInfo().subscribe(res => {
            localStorage.setItem('userId', res.id);
            const token = StorageUtil.getLocalStorage('TOKEN');
            token && history.replace('/home');
          });
        });
      return;
    }
    loginService
      .bindPhone({
        phone: state.phonenumber,
        code: state.verificationCode,
        requestId: state.requestId,
        openId: openId
      })
      .subscribe(res => {
        StorageUtil.setLocalStorage('TOKEN', res);
        loginService.getUserInfo().subscribe(res => {
          localStorage.setItem('userId', res.id);
          const token = StorageUtil.getLocalStorage('TOKEN');
          token && history.replace('/home');
        });
      });
  }
  // 内置平台判断
  function getPlatform() {
    const ua = navigator.userAgent;
    const isAndroid = ua.match(/android/i);
    const isIos = ua.match(/(iPhone|iPod|iPad);?/i);
    const isWx = ua.toLowerCase().match(/MicroMessenger/i);
    return {
      plantform: isAndroid ? 'Android' : isIos ? 'IOS' : 'Unknown',
      isWx
    };
  }
  // 获取code
  function getCode() {
    const codeStr = location.href.split('?')[1];
    if (!codeStr) {
      const str = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
        process.env.appId
      }&redirect_uri=${encodeURIComponent(
        process.env.redirectURL
      )}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
      location.href = str;
      return;
    }
    const code = codeStr.split('&')[0].split('=')[1];
    loginService.getWechatInfo(code).subscribe(res => {
      // const resp = res || 'ooowjs06wfj1naiTTYk17UqvnQCY';
      const resp = res;
      if (/^/.test(resp)) {
        StorageUtil.setLocalStorage('TOKEN', res);
        loginService.getUserInfo().subscribe(res => {
          localStorage.setItem('userId', res.id);
          const token = StorageUtil.getLocalStorage('TOKEN');
          token && history.replace('/home');
        });
        return;
      }
      setStateWrap({
        showLogin: true
      });
      openId = resp;
    });
  }
  return {
    state,
    onErrorClick,
    onChange,
    handleJoin,
    getVerificationCode,
    handlePhoneChange,
    handleVerificationCodeChange
  };
}
