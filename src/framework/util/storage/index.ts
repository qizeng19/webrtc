// import * as jsCookie from 'js-cookie';

const { STORAGE_PREFIX } = process.env;
export class StorageUtil {
  // LocalStorage
  static getLocalStorage(key: string) {
    return localStorage.getItem((STORAGE_PREFIX || '') + key);
  }
  static setLocalStorage(key: string, value: string) {
    return localStorage.setItem((STORAGE_PREFIX || '') + key, value);
  }
  static removeLocalStorage(key: string) {
    return localStorage.removeItem((STORAGE_PREFIX || '') + key);
  }
  static clearLocalStorage() {
    return localStorage.clear();
  }

  // SessionStorage
  static getSessionStorage(key: string) {
    return sessionStorage.getItem((STORAGE_PREFIX || '') + key);
  }
  static setSessionStorage(key: string, value: string) {
    return sessionStorage.setItem((STORAGE_PREFIX || '') + key, value);
  }
  static removeSessionStorage(key: string) {
    return sessionStorage.removeItem((STORAGE_PREFIX || '') + key);
  }
  static clearSessionStorage() {
    return sessionStorage.clear();
  }

  // // Cookie
  // static getCookie(key: string) {
  //   return jsCookie.get((STORAGE_PREFIX || '') + key);
  // }
  // static setCookie(key: string, value: string, options?: jsCookie.CookieAttributes) {
  //   return jsCookie.set((STORAGE_PREFIX || '') + key, value, options);
  // }
  // static removeCookie(key: string) {
  //   return jsCookie.remove((STORAGE_PREFIX || '') + key);
  // }
}
