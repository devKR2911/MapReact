import * as types from '../constants/actionTypes';

export const onVehicleSelected = (payload) => ({
  type: types.VEHICLE_SELECTED,
  payload
});
