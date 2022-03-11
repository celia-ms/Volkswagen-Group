import { Action, createReducer, on } from '@ngrx/store';
import { Car } from 'src/app/core/models/car.model';
import {
  getCars,
  getCarById,
  saveCars,
  saveCar,
  clearCarState,
  deleteCarById,
} from './car.actions';

export interface CarState {
  cars: Car[];
  car: Car;
}

export const initialState: CarState = {
  cars: [],
  car: new Car(),
};

const _carReducer = createReducer(
  initialState,
  on(getCars, (state) => {
    return {
      ...state,
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
  })
);

export function CarReducer(state: CarState | undefined, action: Action) {
  return _carReducer(state, action);
}
