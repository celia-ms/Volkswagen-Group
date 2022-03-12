import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/core/models/car.model';
import { AppState } from 'src/app/core/store/app.state';
import { clearCarState, getCars } from '../../store/car.actions';
import * as _ from 'lodash';
import { Filter } from 'src/app/core/models/filter.model';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { paths } from 'src/app/app-paths';
import { brandMock } from 'src/app/core/mocks/brand.mock';
import { Brand } from 'src/app/core/models/brand.model';
@Component({
  selector: 'app-car',
  templateUrl: './cars.component.html',
})
export class CarsComponent implements OnInit, OnDestroy {
  readonly MAX_ITEM_PAGE = 12;

  subscriptions = new Subscription();

  @ViewChild('dialogCar', { static: true }) dialogCar: any;

  cars: Car[] = [];
  car: Car = new Car();

  columns: number = 6;
  rowHeight: string = '360px';
  gutterSize: string = '20px';

  finishPage: number = 0;
  actualPage: number = 1;
  maxItems: number = 0;

  start: number = 0;
  end: number = this.MAX_ITEM_PAGE;

  isScroll: boolean = false;
  isLoading: boolean = false;
  isLoadingMore: boolean = false;
  isUpward: boolean = false;

  scrollHeight: number = 260;

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  brands: Brand[] = brandMock;

  filter: Filter = {
    id: 0,
    field: '',
    search: '',
    order: 'asc',
  };

  fieldsSearch = ['model', 'description', 'price', 'power', 'fuel'];
  fieldsSort = [
    {
      display: 'car.fields.model.display',
      value: 'model',
    },
    {
      display: 'car.fields.description.display',
      value: 'description',
    },
    {
      display: 'car.fields.price.display',
      value: 'price',
    },
    {
      display: 'car.fields.power.display',
      value: 'power',
    },
    {
      display: 'car.fields.fuel.display',
      value: 'fuel',
    },
  ];

  message = {
    title: 'car.no_cars.title',
    description: 'car.no_cars.description',
    image: `${paths.image_cars}/icon-not-found.svg`,
  };

  constructor(
    private snackBarService: SnackBarService,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.subscriptions.add(
      this.store.select('car').subscribe(({ cars, car, isLoadingCars }) => {
        this.cars = _.cloneDeep(
          _.map(cars, (car) => ({
            ...car,
            image: `${paths.image_cars}/${car.image}`,
          }))
        );
        this.car = {
          ...car,
          image: `${paths.image_cars}/${car.image}`,
        };

        this.isLoading = isLoadingCars;

        if (this.cars && this.cars.length > 0) {
          this.finishPage = Math.ceil(this.cars.length / this.MAX_ITEM_PAGE);
          this.maxItems = this.cars.length;
        }
      })
    );
  }

  ngOnInit(): void {
    this.filter.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getCars();
  }

  getCars() {
    this.store.dispatch(
      getCars({ filter: { ...this.filter }, fields: [...this.fieldsSearch] })
    );
  }

  loadCars() {
    this.isScroll = true;
    if (this.cars.length > this.MAX_ITEM_PAGE && this.end < this.maxItems) {
      this.isLoadingMore = true;
      setTimeout(() => {
        if (this.actualPage < this.finishPage) {
          this.actualPage++;
          this.end += this.MAX_ITEM_PAGE;
          if (this.end >= this.maxItems)
            this.snackBarService.success('car.no_more_cars');
        }
        this.isLoadingMore = false;
      }, 1200);
    }
  }

  searchCars(search: string) {
    this.filter.search = search;
    this.getCars();
  }

  sortCars(filter: Filter) {
    this.filter = filter;
    this.getCars();
  }

  brandChange() {
    this.isScroll = false;
    this.end = this.MAX_ITEM_PAGE;
    this.getCars();
  }

  openDialog() {
    this.dialogCar.open();
  }

  closeDialog() {}

  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    const yOffSet = (event.target as Element).scrollTop;
    this.isUpward = yOffSet > this.scrollHeight;
  }

  onScrollTop() {
    var elmnt = document.getElementById('cars-container');
    if (elmnt?.scrollTop) elmnt.scrollTop = 0;
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearCarState());
    this.subscriptions.unsubscribe();
  }
}
