import { Observable } from 'rxjs';

/**
 * @description dto层
 */
export const WX_GET_SHOP_LOCATION_URL = '';
export const WX_USER_GETTICKET = '';

export abstract class LocationDto {
  abstract getShopLocationList(params: LocationResultParams): Observable<{ data: Array<LocationResultResponse> }>;
}

export interface LocationResultResponse {
  latitude: number;
  longitude: number;
  unitName: string;
  unitMobile: string;
  unitAddress: string;
  operatingTime: string;
  distance: number;
  id: string;
  tags: string[];
}

export interface LocationResultParams {
  vehicleFrameNumber?: string;
  localLatitude?: number;
  localLongitude?: number;
  userId?: string;
  vehicleId?: string;
  sortType?: number;
  page?: number;
  size?: number;
  beginTime?: string;
  endTime?: string;
}
