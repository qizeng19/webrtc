import { AreaDTO, OpenProvinceInfoResult } from '../dto/area.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const OPEN_PROVINCE_INFO = '';
const CITY_INFO_BY_PROVINCECODE = '';

@DepUtil.Injectable()
export class AreaService extends AreaDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  getOpenProvinceInfo(): Observable<Array<OpenProvinceInfoResult>> {
    return this.requestService.get(OPEN_PROVINCE_INFO);
  }

  getCityInfoByProvinceCode(params: { provinceCode: string }): Observable<Array<OpenProvinceInfoResult>> {
    return this.requestService.get(CITY_INFO_BY_PROVINCECODE, params);
  }
}
