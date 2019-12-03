import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function (state = initialState.mapData, action) {
  switch (action.type) {
    case types.VEHICLE_SELECTED:
      return action.payload.mapData;
    default:
      return state;
  }
}
