import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, delay } from 'rxjs/operators';
import { Car } from 'src/app/core/models/car.model';
import { CarService } from 'src/app/core/services/car.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import {
  getCars,
  getCarById,
  createCar,
  updateCarById,
  deleteCarById,
  saveCars,
  saveCar,
  setIsLoadingCars,
} from './car.actions';

@Injectable()
export class CarEffects {
  constructor(
    private snackBarService: SnackBarService,
    private actions$: Actions,
    private carService: CarService
  ) {}

  getCars$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCars),
      delay(1000),
      exhaustMap((action) =>
        this.carService.getCars(action.filter, action.fields).pipe(
          switchMap((cars: Car[]) => [
            saveCars({ cars: cars }),
            setIsLoadingCars({ isLoadingCars: false }),
          ]),
          catchError(() => {
            this.snackBarService.error('service.error.getCars');
            return EMPTY;
          })
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
          catchError(() => {
            this.snackBarService.error('service.error.getCarById');
            return EMPTY;
          })
        )
      )
    );
  });

  createCar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createCar),
      exhaustMap((action) =>
        this.carService.createCar(action.car).pipe(
          map((car: Car) => {
            this.snackBarService.success('service.success.createCar');
            return saveCar({ car: car });
          }),
          catchError(() => {
            this.snackBarService.error('service.error.createCar');
            return EMPTY;
          })
        )
      )
    );
  });

  updateCarById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateCarById),
      exhaustMap((action) =>
        this.carService.updateCarById(action.id, action.car).pipe(
          map((car: Car) => {
            this.snackBarService.success('service.success.updateCarById');
            return saveCar({ car: car });
          }),
          catchError(() => {
            this.snackBarService.error('service.error.updateCarById');
            return EMPTY;
          })
        )
      )
    );
  });

  deleteCarById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteCarById),
      exhaustMap((action) =>
        this.carService.deleteCarById(action.id).pipe(
          map(() => {
            this.snackBarService.success('service.success.deleteCarById');
            return saveCar({ car: new Car() });
          }),
          catchError(() => {
            this.snackBarService.error('service.error.updateCarById');
            return EMPTY;
          })
        )
      )
    );
  });
}
