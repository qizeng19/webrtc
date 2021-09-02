import { prefixActionTypes } from '~/framework/util/common';

export const TYPES = {
  SET_SOURCE: 'SET_SOURCE',
  SET_LOCATION: 'SET_LOCATION'
};

prefixActionTypes('GLOBAL')(TYPES);
