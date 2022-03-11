import { createAction, props, union } from '@ngrx/store';
import { Car } from 'src/app/core/models/car.model';
import { Filter } from 'src/app/core/models/filter.model';

export const getCars = createAction(
  '[CAR] Get cars',
  props<{ filter: Filter; fields: string[] }>()
);

export const getCarById = createAction(
  '[CAR] Get car by id',
  props<{ id: number }>()
);

export const createCar = createAction(
  '[CAR] Create car',
  props<{ car: Car }>()
);

export const updateCarById = createAction(
  '[CAR] Update car by id',
  props<{ id: number; car: Car }>()
);

export const deleteCarById = createAction(
  '[CAR] Delete car by id',
  props<{ id: number }>()
);

export const saveCars = createAction(
  '[CAR] Save cars',
  props<{ cars: Car[] }>()
);

export const setIsLoadingCars = createAction(
  '[CAR] Set loading cars',
  props<{ isLoadingCars: boolean }>()
);

export const saveCar = createAction('[CAR] Save car', props<{ car: Car }>());

export const clearCarState = createAction('[CAR] Clear state');

const actions = union({
  getCars,
  getCarById,
  createCar,
  updateCarById,
  deleteCarById,
  saveCars,
  saveCar,
  clearCarState,
  setIsLoadingCars,
});

export type CarActions = typeof actions;
