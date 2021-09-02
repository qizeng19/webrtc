import { TYPES } from './global.type';
import { UserInfo } from '~/solution/model/dto/home.dto';

// 设置 loading
export function setLoadingAction(payload: boolean) {
  return {
    type: TYPES.SET_LAYOUT_LOADING,
    payload
  };
}

export function setUserInfo(payload: UserInfo) {
  return {
    type: TYPES.SET_USER_INFO,
    payload
  };
}
