import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { CarService } from './car.service';
import {
  TEST_CAR,
  TEST_CARS,
  TEST_CREATE_CAR,
  TEST_DELETE_CAR,
  TEST_UPDATE_CAR,
} from '../mocks/car.mock';
import { asyncData, asyncError } from '../helpers/async.observable.helpers';
import { Car } from '../models/car.model';

describe('CarService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: CarService;

  const errorNotFoundResponse = new HttpErrorResponse({
    error: 'test 404 error',
    status: 404,
    statusText: 'Not Found',
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [CarService, HttpClient],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    service = new CarService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('cars functions', () => {
    const filter = {
      id: 1,
      field: '',
      search: '',
      order: 'asc',
    };

    const fields = [
      'model',
      'description',
      'price',
      'power',
      'fuel',
      'currency',
    ];

    let carsFilterById = _.filter(
      TEST_CARS,
      (car) => car.brad_id === filter.id
    );

    beforeEach(() => {
      carsFilterById = _.filter(TEST_CARS, (car) => car.brad_id === filter.id);
    });

    describe('getCars function', () => {
      it('should have getCars function', () => {
        expect(service.getCars).toBeTruthy();
      });

      it('should return all cars with the brand id that passed to param', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(carsFilterById));

        service.getCars(filter, fields).subscribe({
          next: (response) => {
            expect(response).toEqual(carsFilterById);
            done();
          },
          error: done.fail,
        });
      });

      it('should return an array length > 0 and length === 3', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(carsFilterById));
        service.getCars(filter, fields).subscribe({
          next: (response) => {
            expect(response.length).toBeGreaterThan(0);
            expect(response.length).toBe(3);
            done();
          },
          error: done.fail,
        });
      });

      it('should return an array empty ([]) if the server not have cars', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData([]));

        service.getCars(filter, fields).subscribe({
          next: (response) => {
            expect(response).toBeDefined([]);
            done();
          },
          error: done.fail,
        });
      });

      it('should return an error when the server not found the cars and returns a 404', async () => {
        httpClientSpy.get.and.returnValue(asyncError(errorNotFoundResponse));

        await service.getCars(filter, fields).subscribe({
          next: (response) => {
            fail('expected an error, not cars');
          },
          error: (error) => expect(error.error).toContain('test 404 error'),
        });
      });
    });

    describe('getCarById function', () => {
      const id = 1;

      it('should have getCarById function', () => {
        expect(service.getCarById).toBeTruthy();
      });

      it('should return the car with the id that passed to param', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(TEST_CAR));

        service.getCarById(id).subscribe({
          next: (response) => {
            expect(response.id).toEqual(id);
            done();
          },
          error: done.fail,
        });
      });

      it('should return an object empty ({}) if the server not find the car', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData({}));

        service.getCarById(id).subscribe({
          next: (response) => {
            expect(response).toBeDefined({});
            done();
          },
          error: done.fail,
        });
      });

      it('should return an error when the server not found the car and returns a 404', async () => {
        httpClientSpy.get.and.returnValue(asyncError(errorNotFoundResponse));

        await service.getCarById(id).subscribe({
          next: (response) => {
            fail('expected an error, not car');
          },
          error: (error) => expect(error.error).toContain('test 404 error'),
        });
      });
    });

    describe('createCar function', () => {
      it('should have createCar function', () => {
        expect(service.createCar).toBeTruthy();
      });

      it('should return the new car with the data that passed to param', (done: DoneFn) => {
        httpClientSpy.post.and.returnValue(asyncData(TEST_CREATE_CAR));

        service.createCar(TEST_CREATE_CAR).subscribe({
          next: (response) => {
            expect(response).toEqual(TEST_CREATE_CAR);
            done();
          },
          error: done.fail,
        });
      });

      it('should return an error when the new car have duplicate id', async () => {
        const errorDuplicateIdResponse = new HttpErrorResponse({
          error: 'test 500 error',
          status: 500,
          statusText: 'Insert failed, duplicate id',
        });

        httpClientSpy.post.and.returnValue(
          asyncError(errorDuplicateIdResponse)
        );

        await service.createCar(TEST_CREATE_CAR).subscribe({
          next: (response) => {
            fail('expected an error, not car');
          },
          error: (error) => {
            expect(error.error).toContain('test 500 error');
            expect(error.statusText).toContain('Insert failed, duplicate id');
          },
        });
      });

      it('should return an error when the new car that passed to param is without data (new Car())', async () => {
        const errorWithoutDataResponse = new HttpErrorResponse({
          error: 'test 500 error',
          status: 500,
          statusText: 'Insert failed, object car without data',
        });

        httpClientSpy.post.and.returnValue(
          asyncError(errorWithoutDataResponse)
        );

        await service.createCar(new Car()).subscribe({
          next: (response) => {
            fail('expected an error, not car');
          },
          error: (error) => {
            expect(error.error).toContain('test 500 error');
            expect(error.statusText).toContain(
              'Insert failed, object car without data'
            );
          },
        });
      });
    });

    describe('updateCarById function', () => {
      const id = 2;

      it('should have updateCarById function', () => {
        expect(service.updateCarById).toBeTruthy();
      });

      it('should return the car update with the data that passed to param', (done: DoneFn) => {
        httpClientSpy.put.and.returnValue(asyncData(TEST_UPDATE_CAR));

        service.updateCarById(id, TEST_UPDATE_CAR).subscribe({
          next: (response) => {
            expect(response).toEqual(TEST_UPDATE_CAR);
            done();
          },
          error: done.fail,
        });
      });

      it('should return the car update with the id that passed to param', (done: DoneFn) => {
        httpClientSpy.put.and.returnValue(asyncData(TEST_UPDATE_CAR));

        service.updateCarById(id, TEST_UPDATE_CAR).subscribe({
          next: (response) => {
            expect(response.id).toEqual(TEST_UPDATE_CAR.id);
            done();
          },
          error: done.fail,
        });
      });

      it('should return an error when the update car that passed to param is without data (new Car())', async () => {
        const errorWithoutDataResponse = new HttpErrorResponse({
          error: 'test 500 error',
          status: 500,
          statusText: 'Insert failed, object car without data',
        });

        httpClientSpy.put.and.returnValue(asyncError(errorWithoutDataResponse));

        await service.updateCarById(id, new Car()).subscribe({
          next: (response) => {
            fail('expected an error, not car');
          },
          error: (error) => {
            expect(error.error).toContain('test 500 error');
            expect(error.statusText).toContain(
              'Insert failed, object car without data'
            );
          },
        });
      });

      it('should return an error when the server not found the update car and returns a 404', async () => {
        httpClientSpy.put.and.returnValue(asyncError(errorNotFoundResponse));

        await service.updateCarById(id, TEST_UPDATE_CAR).subscribe({
          next: (response) => {
            fail('expected an error, not car');
          },
          error: (error) => expect(error.error).toContain('test 404 error'),
        });
      });
    });

    describe('deleteCarById function', () => {
      const id = 3;

      it('should have deleteCarById function', () => {
        expect(service.deleteCarById).toBeTruthy();
      });

      it('should return the car delete with the id that passed to param', (done: DoneFn) => {
        httpClientSpy.delete.and.returnValue(asyncData(TEST_DELETE_CAR));

        service.deleteCarById(id).subscribe({
          next: (response) => {
            expect(response.id).toEqual(TEST_DELETE_CAR.id);
            done();
          },
          error: done.fail,
        });
      });

      it('should return an error when the server not found the delete car and returns a 404', async () => {
        httpClientSpy.delete.and.returnValue(asyncError(errorNotFoundResponse));

        await service.deleteCarById(id).subscribe({
          next: (response) => {
            fail('expected an error, not car');
          },
          error: (error) => expect(error.error).toContain('test 404 error'),
        });
      });
    });

    describe('searchCars function', () => {
      let cars: Car[] = [];
      let carsFind: Car[] = [];

      beforeEach(() => {
        cars = [];
        carsFind = [];
      });

      it('should have searchCars function', () => {
        expect(service.searchCars).toBeTruthy();
      });

      it('should return cars that includes the search word in the model', () => {
        const search = 'Arteon';
        const fields = ['model'];

        carsFind = service.searchCars(TEST_CARS, search, fields);
        _.forEach(carsFind, (car) => {
          expect(car.model).toContain(search);
        });
      });

      it('should return cars that includes the search word in any of its fields', () => {
        const search = 'berlina';
        const fields = ['model', 'description', 'price'];

        carsFind = service.searchCars(TEST_CARS, search, fields);
        _.forEach(carsFind, (car) => {
          expect(JSON.stringify(Object.values(car))).toContain(search);
        });
      });

      it('should return items length === 0 when not find the search word', () => {
        const search = 'XXXXXXX';
        const fields = ['model', 'description', 'price'];

        carsFind = service.searchCars(TEST_CARS, search, fields);
        expect(carsFind.length).toBe(0);
      });
    });
  });
});
