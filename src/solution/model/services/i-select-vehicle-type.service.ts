import { ISelectVehicleTypeDTO } from '../dto/i-select-vehicle-type.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
const VEHICLE_BRAND = '';
const VEHICLE_FACTORY = '';
const VEHICLE_VERSION = '';
const VEHICLE_CONFIG = '';
const SIMPLEVEHICLEBRAND = '';

export class ISelectVehicleTypeService extends ISelectVehicleTypeDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  vehicleFactory(params: object): Observable<any> {
    return this.requestService.get(VEHICLE_FACTORY, params);
  }

  vehicleBrand(params: object): Observable<any> {
    return this.requestService.get(VEHICLE_BRAND, params);
  }

  vehicleVersion(params: object): Observable<any> {
    return this.requestService.get(VEHICLE_VERSION, params);
  }

  vehicleConfig(params: object): Observable<any> {
    return this.requestService.get(VEHICLE_CONFIG, params);
  }

  simplevehicleBrand(params: object): Observable<any> {
    return this.requestService.get(SIMPLEVEHICLEBRAND, params);
  }
}
