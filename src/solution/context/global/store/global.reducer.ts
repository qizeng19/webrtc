import { IAction } from '~/solution/shared/interfaces/common.interface';
import { IBaseGlobalState } from '../global.interface';
import { TYPES } from './global.type';

export const initialState: IBaseGlobalState = {
  source: '',
  location: ''
};

export function reducer(state = initialState, action: IAction<any>) {
  const { type, payload } = action;
  switch (type) {
    case TYPES.SET_SOURCE:
      return {
        ...state,
        source: payload
      };
    case TYPES.SET_LOCATION:
      return {
        ...state,
        location: payload
      };
    default:
      return state;
  }
}
