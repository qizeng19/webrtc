import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class AreaDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract getOpenProvinceInfo(): Observable<Array<OpenProvinceInfoResult>>;
  abstract getCityInfoByProvinceCode(params: { provinceCode: string }): Observable<Array<OpenProvinceInfoResult>>;
}

export interface OpenProvinceInfoResult {
  name: string;
  code: string;
  children: Array<OpenProvinceInfoResult>;
}
