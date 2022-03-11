import { Action, createReducer, on } from '@ngrx/store';
import { Car } from 'src/app/core/models/car.model';
import {
  getCars,
  getCarById,
  saveCars,
  saveCar,
  clearCarState,
  deleteCarById,
  setIsLoadingCars,
} from './car.actions';

export interface CarState {
  cars: Car[];
  car: Car;
  isLoadingCars: boolean;
}

export const initialState: CarState = {
  cars: [],
  car: new Car(),
  isLoadingCars: false,
};

const _carReducer = createReducer(
  initialState,
  on(getCars, (state) => {
    return {
      ...state,
      isLoadingCars: true,
    };
  }),
  on(getCarById, (state) => {
    return {
      ...state,
    };
  }),
  on(deleteCarById, (state) => {
    return {
      ...state,
      car: new Car(),
    };
  }),
  on(saveCars, (state, { cars }) => {
    return {
      ...state,
      cars: cars,
    };
  }),
  on(saveCar, (state, { car }) => {
    return {
      ...state,
      car: car,
    };
  }),
  on(clearCarState, () => {
    return {
      ...initialState,
    };
  }),
  on(setIsLoadingCars, (state, { isLoadingCars }) => {
    return {
      ...state,
      isLoadingCars: isLoadingCars,
    };
  })
);

export function CarReducer(state: CarState | undefined, action: Action) {
  return _carReducer(state, action);
}
