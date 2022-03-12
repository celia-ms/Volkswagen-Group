import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { paths } from 'src/app/app-paths';
import { actions } from 'src/app/constants/constants';
import { brandMock } from 'src/app/core/mocks/brand.mock';
import { Brand } from 'src/app/core/models/brand.model';
import { Car } from 'src/app/core/models/car.model';
import { AppState } from 'src/app/core/store/app.state';
import * as carSelector from 'src/app/features/cars/store/car.selector';
import * as _ from 'lodash';
import { updateCarById, createCar } from '../../store/car.actions';

@Component({
  selector: 'app-form-car',
  templateUrl: './form-car.component.html',
})
export class FormCarComponent implements OnInit, OnChanges, OnDestroy {
  @Input('action') action: number = 0;

  actions: typeof actions = actions;

  subscriptions = new Subscription();

  carForm!: FormGroup;

  car: Car = new Car();

  brands: Brand[] = brandMock;

  fuelTypes = [
    {
      id: 1,
      type: 'Diesel',
      value: 'car.fields.fuel.types.diesel',
    },
    {
      id: 2,
      type: 'Gasolina',
      value: 'car.fields.fuel.types.gasoline',
    },
  ];

  image!: string;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    this.carForm = this.formBuilder.group({
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      power: new FormControl('', [Validators.required]),
      fuel: new FormControl('', [Validators.required]),
    });

    this.subscriptions.add(
      this.store.pipe(select(carSelector.getCar)).subscribe((car) => {
        this.car = { ...car };
        this.image = `${paths.image_cars}/${car.image}`;
        this.loadForm();
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    switch (this.action) {
      case actions.SHOW:
        this.carForm.disable();
        break;
      case actions.EDIT:
        this.carForm.enable();
        break;
      case actions.NEW:
        this.carForm.enable();
        break;
    }
  }

  ngOnInit(): void {
    this.resetForm();
  }

  loadForm() {
    this.carForm.controls.brand.setValue(this.car.brad_id);
    this.carForm.controls.model.setValue(this.car.model);
    this.carForm.controls.description.setValue(this.car.description);
    this.carForm.controls.price.setValue(this.car.price);
    this.carForm.controls.power.setValue(this.car.power);
    this.carForm.controls.fuel.setValue(this.car.fuel);
  }

  saveForm() {
    let isSave = false;
    if (this.carForm.valid) {
      this.car.brad_id = this.carForm.controls.brand.value;
      this.car.model = this.carForm.controls.model.value;
      this.car.description = this.carForm.controls.description.value;
      this.car.price = this.carForm.controls.price.value;
      this.car.power = this.carForm.controls.power.value;
      this.car.fuel = this.carForm.controls.fuel.value;
      isSave = true;
      switch (this.action) {
        case actions.EDIT:
          this.store.dispatch(
            updateCarById({ id: this.car.id, car: this.car })
          );
          break;
        case actions.NEW:
          this.car.image = 'icon-not-image.png';
          this.store.dispatch(createCar({ car: this.car }));
          break;
      }
    } else {
      this.validateAllFormFields(this.carForm);
    }
    return isSave;
  }

  resetForm() {
    this.carForm.reset();
    this.car = new Car();
    this.image = `${paths.image_cars}/icon-not-image.png`;
    this.carForm.controls.fuel.setValue(this.fuelTypes[0].type);
    this.carForm.controls.brand.setValue(this.brands[0].id);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
