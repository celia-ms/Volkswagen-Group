import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { CarService } from './car.service';
import { TEST_CAR, TEST_CARS } from '../mocks/car.mock';
import { asyncData, asyncError } from '../helpers/async.observable.helpers';

describe('CarService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: CarService;

  const errorResponse = new HttpErrorResponse({
    error: 'test 404 error',
    status: 404,
    statusText: 'Not Found',
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [CarService, HttpClient],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
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

      it('should return an error when the server returns a 404', async () => {
        httpClientSpy.get.and.returnValue(asyncError(errorResponse));

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

      it('should return an error when the server returns a 404', async () => {
        httpClientSpy.get.and.returnValue(asyncError(errorResponse));

        await service.getCarById(id).subscribe({
          next: (response) => {
            fail('expected an error, not car');
          },
          error: (error) => expect(error.error).toContain('test 404 error'),
        });
      });
    });
  });
});
