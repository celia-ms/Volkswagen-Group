import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Car } from 'src/app/core/models/car.model';
import { paths } from 'src/app/app-paths';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  readonly URL = `${environment.server}/${paths.car}`;

  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.URL);
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.URL}/${id}`);
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.URL, car);
  }

  updateCar(id: number, car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.URL}/${id}`, car);
  }

  deleteCarById(id: number): Observable<Car> {
    return this.http.delete<Car>(`${this.URL}/${id}`);
  }
}
