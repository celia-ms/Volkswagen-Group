import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { appReducers } from 'src/app/core/store/app.state';
import { MaterialModule } from 'src/app/material/material.module';

import { FormCarComponent } from './form-car.component';
import { TEST_CAR } from '../../../../core/mocks/car.mock';
import { Car } from 'src/app/core/models/car.model';

describe('FormCarComponent', () => {
  let component: FormCarComponent;
  let fixture: ComponentFixture<FormCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(appReducers),
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => {
              return new TranslateHttpLoader(http);
            },
            deps: [HttpClient],
          },
        }),
      ],
      declarations: [FormCarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the fields: brand, model, description, price, power and fuel', () => {
    expect(component.carForm.contains('brand')).toBeTruthy();
    expect(component.carForm.contains('model')).toBeTruthy();
    expect(component.carForm.contains('description')).toBeTruthy();
    expect(component.carForm.contains('price')).toBeTruthy();
    expect(component.carForm.contains('power')).toBeTruthy();
    expect(component.carForm.contains('fuel')).toBeTruthy();
  });

  it('should have the fields: brand, model, description, price, power and fuel required', () => {
    const controls = component.carForm.controls;
    controls.brand.setValue('');
    expect(controls.brand.setValue('')).toBeFalsy();
    controls.model.setValue('');
    expect(controls.model.setValue('')).toBeFalsy();
    controls.description.setValue('');
    expect(controls.description.setValue('')).toBeFalsy();
    controls.price.setValue('');
    expect(controls.price.setValue('')).toBeFalsy();
    controls.power.setValue('');
    expect(controls.power.setValue('')).toBeFalsy();
    controls.fuel.setValue('');
    expect(controls.fuel.setValue('')).toBeFalsy();
  });

  describe('form car functions', () => {
    describe('loadForm function', () => {
      it('should load the form with the car data', () => {
        const controls = component.carForm.controls;
        component.car = TEST_CAR;
        component.loadForm();
        expect(controls.brand.value).toBe(TEST_CAR.brad_id);
        expect(controls.model.value).toBe(TEST_CAR.model);
        expect(controls.description.value).toBe(TEST_CAR.description);
        expect(controls.price.value).toBe(TEST_CAR.price);
        expect(controls.power.value).toBe(TEST_CAR.power);
        expect(controls.fuel.value).toBe(TEST_CAR.fuel);
      });
    });

    describe('saveForm function', () => {
      it('should save the form data in the car', () => {
        const controls = component.carForm.controls;
        component.car = new Car();

        controls.brand.setValue(TEST_CAR.brad_id);
        controls.model.setValue(TEST_CAR.model);
        controls.description.setValue(TEST_CAR.description);
        controls.price.setValue(TEST_CAR.price);
        controls.power.setValue(TEST_CAR.power);
        controls.fuel.setValue(TEST_CAR.fuel);

        component.saveForm();

        expect(component.car.brad_id).toBe(controls.brand.value);
        expect(component.car.model).toBe(controls.model.value);
        expect(component.car.description).toBe(controls.description.value);
        expect(component.car.price).toBe(controls.price.value);
        expect(component.car.power).toBe(controls.power.value);
        expect(component.car.fuel).toBe(controls.fuel.value);
      });

      it('should return false if the form is not valid', () => {
        const controls = component.carForm.controls;
        component.car = new Car();

        controls.brand.setValue(TEST_CAR.brad_id);
        controls.model.setValue(TEST_CAR.model);

        const isSave = component.saveForm();

        expect(isSave).toBeFalse();
      });

      it('should return true if the form is valid', () => {
        component.car = TEST_CAR;
        component.loadForm();

        const isSave = component.saveForm();

        expect(isSave).toBeTrue();
      });
    });

    describe('resetForm function', () => {
      it('should reset the form data', () => {
        const controls = component.carForm.controls;
        component.car = TEST_CAR;

        component.loadForm();

        expect(controls.model.value).toBe(TEST_CAR.model);

        component.resetForm();

        expect(controls.model.value).toBeNull();
      });

      it('should reset the car data', () => {
        component.car = TEST_CAR;

        component.resetForm();

        expect(component.car).toEqual(new Car());
      });
    });
  });
});
