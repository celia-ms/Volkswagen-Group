import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from 'src/app/core/models/car.model';
import { paths } from 'src/app/app-paths';
import * as _ from 'lodash';
import { Filter } from '../models/filter.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  readonly URL = `${environment.server}/${paths.car}`;

  constructor(private http: HttpClient) {}

  getCars(filter: Filter, fields: string[]): Observable<Car[]> {
    return this.http
      .get<Car[]>(this.URL, {
        params: {
          brad_id: filter.id,
          _sort: filter.field,
          _order: filter.order,
        },
      })
      .pipe(
        map((cars) => {
          return this.searchCars(cars, filter.search, fields);
        })
      );
  }

  getCarById(id: number) {
    return this.http.get<Car>(`${this.URL}/${id}`);
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.URL, car);
  }

  updateCarById(id: number, car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.URL}/${id}`, car);
  }

  deleteCarById(id: number): Observable<Car> {
    return this.http.delete<Car>(`${this.URL}/${id}`);
  }

  searchCars(cars: Car[], search: string, fields: string[]) {
    return _.filter(cars, (car) =>
      _.some(fields, (field) =>
        car[field as keyof Car]
          .toString()
          .toLowerCase()
          .includes(search?.toLowerCase())
      )
    );
  }
}
