import {
  LocationDto,
  LocationResultResponse,
  LocationResultParams,
  WX_GET_SHOP_LOCATION_URL,
  WX_USER_GETTICKET
} from '../dto/location.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * @description url 声明
 */
const GET_SHOP_LOCATION_URL = '';
const USER_GETTICKET = '';
/**
 * @description service
 */
@DepUtil.Injectable()
export class ShopLocationService extends LocationDto {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  private source = localStorage.getItem('source');

  constructor() {
    super();
  }
  getShopLocationList(params: LocationResultParams): Observable<{ data: Array<LocationResultResponse> }> {
    const url = this.source ? WX_GET_SHOP_LOCATION_URL : GET_SHOP_LOCATION_URL;
    return this.requestService.post(url, params);
  }

  getCurrentWXConfig(url: string) {
    const params = {
      baseParam: {
        codeTypeEnum: 1,
        configKey: ''
      },
      absoluteUri: url
    };
    const requestUrl = this.source ? WX_USER_GETTICKET : USER_GETTICKET;

    return this.requestService.post(requestUrl, params);
  }
}
