import { ActionReducerMap } from '@ngrx/store';
import { CarEffects } from 'src/app/features/cars/store/car.effects';
import { CarReducer, CarState } from 'src/app/features/cars/store/car.reducers';

export interface AppState {
  car: CarState;
}

export const appReducers: ActionReducerMap<AppState> = {
  car: CarReducer,
};

export const appEffects: any[] = [CarEffects];
