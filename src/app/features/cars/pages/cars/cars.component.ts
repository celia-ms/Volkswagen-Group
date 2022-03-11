import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/core/models/car.model';
import { AppState } from 'src/app/core/store/app.state';
import { clearCarState, getCars } from '../../store/car.actions';

@Component({
  selector: 'app-car',
  templateUrl: './cars.component.html',
})
export class CarsComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();

  brandId: number = 0;

  cars: Car[] = [];
  car: Car = new Car();

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.subscriptions.add(
      this.store.select('car').subscribe(({ cars, car }) => {
        this.cars = cars;
        this.car = car;
      })
    );
  }

  ngOnInit(): void {
    this.brandId = Number(this.route.snapshot.paramMap.get('id'));
    this.getCars();
  }

  getCars() {
    this.store.dispatch(getCars());
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearCarState());
    this.subscriptions.unsubscribe();
  }
}
