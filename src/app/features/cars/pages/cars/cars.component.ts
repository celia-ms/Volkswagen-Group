import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/core/models/car.model';
import { AppState } from 'src/app/core/store/app.state';
import {
  clearCarState,
  deleteCarById,
  getCarById,
  getCars,
} from '../../store/car.actions';
import * as _ from 'lodash';
import { Filter } from 'src/app/core/models/filter.model';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { paths } from 'src/app/app-paths';
import { brandMock } from 'src/app/core/mocks/brand.mock';
import { Brand } from 'src/app/core/models/brand.model';
import * as carSelector from 'src/app/features/cars/store/car.selector';
import { actions } from 'src/app/constants/constants';
import { DialogConfig } from 'src/app/core/models/dialog-config.model';
import { setFilterCars } from '../../store/car.actions';
@Component({
  selector: 'app-car',
  templateUrl: './cars.component.html',
})
export class CarsComponent implements OnInit, OnDestroy {
  readonly MAX_ITEM_PAGE = 12;

  actions: typeof actions = actions;

  subscriptions = new Subscription();

  @ViewChild('dialogCar', { static: true }) dialogCar: any;
  @ViewChild('dialogDelete', { static: true }) dialogDelete: any;

  cars: Car[] = [];
  car: Car = new Car();

  idSelectedCar!: number;

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

  filter!: Filter;

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

  dialogDeleteConfig: DialogConfig = {
    title: 'dialog.delete.title',
    width: '30vw',
    height: '26vh',
    showCancelButton: true,
    showConfirmButton: true,
    confirmText: 'dialog.buttons.delete',
    backdropClass: 'dialog-delete-container',
  };

  constructor(
    private router: Router,
    private snackBarService: SnackBarService,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.subscriptions.add(
      this.store.pipe(select(carSelector.getCars)).subscribe((cars) => {
        this.cars = _.map(cars, (car) => ({
          ...car,
          image: `${paths.image_cars}/${car.image}`,
        }));

        if (this.cars && this.cars.length > 0) {
          this.finishPage = Math.ceil(this.cars.length / this.MAX_ITEM_PAGE);
          this.maxItems = this.cars.length;
        }
      })
    );

    this.subscriptions.add(
      this.store
        .pipe(select(carSelector.getIsLoadingCars))
        .subscribe((isLoadingCars) => {
          this.isLoading = isLoadingCars;
        })
    );

    this.subscriptions.add(
      this.store.pipe(select(carSelector.getFilter)).subscribe((filter) => {
        this.filter = { ...filter };
      })
    );
  }

  ngOnInit(): void {
    this.setDimensions(window);
    this.filter.id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(setFilterCars({ filter: this.filter }));
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

  searchCars(filter: Filter) {
    this.store.dispatch(setFilterCars({ filter: filter }));
    this.getCars();
  }

  sortCars(filter: Filter) {
    this.store.dispatch(setFilterCars({ filter: filter }));
    this.getCars();
  }

  brandChange() {
    this.router.navigate([`${paths.car}/`, this.filter.id]);
    this.isScroll = false;
    this.end = this.MAX_ITEM_PAGE;
    this.finishPage = 0;
    this.actualPage = 1;
    this.maxItems = 0;
    this.start = 0;
    this.store.dispatch(setFilterCars({ filter: this.filter }));
    this.getCars();
  }

  showCar(id: number) {
    this.openDialog(actions.SHOW);
    this.store.dispatch(getCarById({ id: id }));
  }

  editCar(id: number) {
    this.openDialog(actions.EDIT);
    this.store.dispatch(getCarById({ id: id }));
  }

  deleteCar(id: number) {
    this.idSelectedCar = id;
    this.openDialogDelete();
  }

  openDialog(action: number) {
    this.dialogCar.open(action);
  }

  openDialogDelete() {
    this.dialogDelete.open();
  }

  confirmDialogDelete() {
    this.dialogDelete.success();
    this.store.dispatch(deleteCarById({ id: this.idSelectedCar }));
    this.getCars();
  }

  setDimensions(event: any) {
    const width = event.innerWidth;
    if (width < 768) {
      this.refreshDimensions(1, '320px', '12px');
    } else {
      if (width >= 768 && width < 992) {
        this.refreshDimensions(2, '340px', '14px');
      } else {
        if (width >= 992 && width < 1300) {
          this.refreshDimensions(3, '360px', '16px');
        } else {
          if (width >= 1300 && width < 1648) {
            this.refreshDimensions(4, '360px', '18px');
          } else {
            if (width >= 1648 && width < 1860) {
              this.refreshDimensions(5, '360px', '20px');
            } else {
              this.refreshDimensions(6, '360px', '20px');
            }
          }
        }
      }
    }
  }

  refreshDimensions(columns: number, rowHeight: string, gutterSize: string) {
    this.columns = columns;
    this.rowHeight = rowHeight;
    this.gutterSize = gutterSize;
  }

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
