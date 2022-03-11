import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, delay } from 'rxjs/operators';
import { Car } from 'src/app/core/models/car.model';
import { CarService } from 'src/app/core/services/car.service';
import {
  getCars,
  getCarById,
  createCar,
  updateCarById,
  deleteCarById,
  saveCars,
  saveCar,
} from './car.actions';

@Injectable()
export class CarEffects {
  constructor(private actions$: Actions, private carService: CarService) {}

  getCars$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCars),
      delay(2000),
      exhaustMap((action) =>
        this.carService.getCars(action.bradId).pipe(
          switchMap((cars: Car[]) => [saveCars({ cars: cars })]),
          catchError(() => EMPTY)
        )
      )
    );
  });

  getCarById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCarById),
      exhaustMap((action) =>
        this.carService.getCarById(action.id).pipe(
          map((car: Car) => saveCar({ car: car })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  createCar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createCar),
      exhaustMap((action) =>
        this.carService.createCar(action.car).pipe(
          map((car: Car) => saveCar({ car: car })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  updateCarById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateCarById),
      exhaustMap((action) =>
        this.carService.updateCarById(action.id, action.car).pipe(
          map((car: Car) => saveCar({ car: car })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  deleteCarById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteCarById),
      exhaustMap((action) =>
        this.carService.deleteCarById(action.id).pipe(
          map(() => saveCar({ car: new Car() })),
          catchError(() => EMPTY)
        )
      )
    );
  });
}
