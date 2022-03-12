import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as carReducer from './car.reducers';

export const getCarState = createFeatureSelector<carReducer.CarState>('car');

export const getCars = createSelector(
  getCarState,
  (state: carReducer.CarState) => state.cars
);

export const getIsLoadingCars = createSelector(
  getCarState,
  (state: carReducer.CarState) => state.isLoadingCars
);

export const getCar = createSelector(
  getCarState,
  (state: carReducer.CarState) => state.car
);
