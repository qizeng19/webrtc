import React from 'react';
export interface IBaseGlobalState {
 source: string;
 location: any
};

export interface IGlobalState {
  dispatch?: React.Dispatch<any>,
  gState: IBaseGlobalState

}