import axios, { AxiosInstance, AxiosPromise, ResponseType } from 'axios';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DepUtil } from '~/framework/aop/inject';
import { createHashHistory } from 'history';
import { StorageUtil } from '~/framework/util/storage';
import { Toast } from 'antd-mobile';
import { exchangeResponse } from './exchangeReponse';
const isIOS = window.isAppWebView === 'iOS';
export interface HttpResponseModel {
  message: string;
  data: any;
  code: number;
  total?: number;
  status?: boolean;
  timestamp?: string;
}
const history = createHashHistory();
@DepUtil.Injectable()
class RequestService {
  private _httpClient: AxiosInstance;
  private _source: string;
  constructor() {
    this._httpClient = axios.create();
    this._source = localStorage.getItem('source');
  }

  private createAuthHeaders(url: string): any {
    if (!!~url.indexOf('GlobPermissionVerificationPlugin')) {
      return {};
    } else {
      const headers = { uToken: '', uOrgId: '' };
      let uToken = StorageUtil.getLocalStorage('TOKEN');
      if (localStorage.getItem('source')) {
        uToken = StorageUtil.getLocalStorage('TOKEN');
        headers.uOrgId = localStorage.getItem('uOrgId');
      }

      console.log(uToken);

      if (uToken) {
        headers.uToken = uToken;
      }

      return headers;
    }
  }

  private getRootUrl(url: string) {
    const ua = navigator.userAgent;
    const isWx = ua.toLowerCase().match(/miniprogram/i);

    const returnInfo = isWx ? process.env.WXMAIN : process.env.MAIN;
    return returnInfo;
  }

  private _makeRequest(
    method: string,
    url: string,
    queryParams?: object,
    body?: object,
    responseType: ResponseType = 'json',
    message = 'loading'
  ) {
    let request: AxiosPromise;
    Toast.loading(message, 0);
    if (method == 'post' || method == 'put') {
      request = this._httpClient[method](this.getRootUrl(url) + url, body, {
        headers: this.createAuthHeaders(url),
        timeout: 300000,
        responseType
      });
    } else {
      request = this._httpClient[method](this.getRootUrl(url) + url, {
        params: queryParams,
        headers: this.createAuthHeaders(url),
        responseType,
        timeout: 300000
      });
    }

    return new Observable(subscriber => {
      request
        .then(response => {
          subscriber.next(response.data);
          Toast.hide();
          // setTimeout(Toast.hide, 0);
          subscriber.complete();
        })
        .catch((err: Error) => {
          subscriber.error(err);
          subscriber.complete();
        });
    });
  }

  public get(url: string, queryParams?: object) {
    return this._makeRequest('get', url, queryParams).pipe(
      map(data => {
        return this.dealWithError(data, url);
      }),
      catchError(this.handleError)
    );
  }

  public post(url: string, body?: object, queryParams?: object) {
    return this._makeRequest('post', url, queryParams, body).pipe(
      map(data => {
        return this.dealWithError(data, url);
      }),
      catchError(this.handleError)
    );
  }

  public put(url: string, body: object, queryParams?: object) {
    return this._makeRequest('put', url, queryParams, body).pipe(
      map(data => {
        return this.dealWithError(data, url);
      }),
      catchError(this.handleError)
    );
  }

  public delete(url: string, queryParams?: object) {
    return this._makeRequest('delete', url, queryParams).pipe(
      map(data => {
        return this.dealWithError(data, url);
      }),
      catchError(this.handleError)
    );
  }

  public getDownload(url: string, queryParams?: object) {
    return this._makeRequest('get', url, queryParams, {}, 'arraybuffer').pipe(
      map(data => {
        return this.dealWithError(data, url);
      }),
      catchError(this.handleError)
    );
  }

  public postDownload(url: string, body?: any, queryParams?: object) {
    return this._makeRequest('post', url, queryParams, body, 'arraybuffer').pipe(
      map(data => {
        return this.dealWithError(data, url);
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    // 后续在实际应用中添加
    if (error === undefined || error.code === 'ECONNABORTED') {
      error = '服务请求超时';
    } else {
      if (!error.response) {
        if (error.message == 'Network Error') {
          error = '请检查网络。';
        }
      } else {
        const status = error.response.status;
        if (status && parseInt(status) >= 500) {
          error = '服务器错误，请联系管理员。';
        } else if (status === 401) {
          StorageUtil.removeLocalStorage('TOKEN');
          console.log('this._source', this._source);

          if (window.isAppWebView) {
            if (isIOS) {
              window.webkit.messageHandlers.backToApp.postMessage();
            } else {
              window.movingSticker.backToApp();
            }
            return null;
          } else if (this._source == 'wx') {
            wx.miniProgram.navigateTo({
              url: '../app/page/login/index'
            });
          } else {
            history.push('/login');
            error = '登录失效，请重新登录。';
          }
        } else if (status && parseInt(status) >= 400) {
          error = '页面找不到了，请联系管理员。';
        }
      }
    }

    // process.env.SENTRY_URL && Sentry.captureException({ PROJECT: process.env.SENTRY_LABLE, ERROR: error });
    // message.error(error);

    setTimeout(() => {
      Toast.info(error, 1);
    }, 0);
    return throwError(error);
  }

  dealWithError(data: any, url: string) {
    data = data as HttpResponseModel;
    if (typeof data.status !== 'boolean') {
      return exchangeResponse(data, url);
    }
    if (data.status) {
      if (data.total || data.total == 0) {
        return { total: data.total, data: exchangeResponse(data.data, url) };
      }
      if (data.data == 0 || data.data) {
        if (data.data.total || data.data.total == 0) {
          return { total: data.total, data: exchangeResponse(data.data.data, url) };
        } else {
          return exchangeResponse(data.data, url);
        }
      } else {
        return exchangeResponse(data, url);
      }
    } else {
      if (data.code === 401 || data.StatusCode === 401) {
        console.log('this._source', this._source);
        StorageUtil.removeLocalStorage('TOKEN');
        localStorage.removeItem('uOrgId');
        if (window.isAppWebView) {
          if (isIOS) {
            window.webkit.messageHandlers.backToApp.postMessage();
          } else {
            window.movingSticker.backToApp();
          }
          return null;
        } else if (this._source == 'wx') {
          wx.miniProgram.navigateTo({
            url: '../app/page/login/index'
          });
        } else {
          history.push('/login');
          throw '登录失效，请重新登录！';
        }
      }

      throw data.message;
    }
  }
}

export { RequestService };
