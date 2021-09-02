import React from 'react';
import style from './login.component.less';
import { BackNavBarComponent } from '~/framework/components/component.module';
import { useLoginStore } from './login.component.store';

export default function LoginComponent() {
  const {
    state,
    onErrorClick,
    onChange,
    handleJoin,
    getVerificationCode,
    handlePhoneChange,
    handleVerificationCodeChange
  } = useLoginStore();
  return (
    <div className={state.showLogin ? style.login : style.displayNone}>
      <BackNavBarComponent navText="XX项目"></BackNavBarComponent>
      <div className={style.infoWrap}>
        <div className={style.infoItem}>
          <div className={style.imgWrap}>
            <img src={require('~assets/image/phone-icon.png')} alt="" />
          </div>
          <input
            type="text"
            placeholder="输入手机号"
            value={state.phonenumber || ''}
            onChange={$event => {
              handlePhoneChange($event);
            }}
          />
        </div>
        <div className={style.infoItem}>
          <div className={style.imgWrap}>
            <img src={require('~assets/image/verification-code-icon.png')} alt="" />
          </div>
          <input
            type="text"
            placeholder="输入验证码"
            value={state.verificationCode || ''}
            onChange={$event => {
              handleVerificationCodeChange($event);
            }}
          />
          {state.waitTime == 60 ? (
            <span
              onClick={() => {
                getVerificationCode();
              }}
            >
              获取验证码
            </span>
          ) : (
            <span>{state.waitTime}s</span>
          )}
        </div>
        <div className={style.qrCode}>
          <div></div>
        </div>
        <div
          className={style.joinBtn}
          onClick={() => {
            handleJoin();
          }}
        >
          登录文案
        </div>
      </div>
    </div>
  );
}
