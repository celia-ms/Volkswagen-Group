import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { paths } from 'src/app/app-paths';
import { brandMock } from 'src/app/core/mocks/brand.mock';
import { Brand } from 'src/app/core/models/brand.model';
import { Car } from 'src/app/core/models/car.model';

@Component({
  selector: 'app-form-car',
  templateUrl: './form-car.component.html',
})
export class FormCarComponent implements OnInit {
  carForm!: FormGroup;

  car!: Car;

  brands: Brand[] = brandMock;

  fuelTypes = [
    {
      id: 1,
      value: 'car.fields.fuel.types.diesel',
    },
    {
      id: 2,
      value: 'car.fields.fuel.types.gasoline',
    },
  ];

  image = `${paths.image_cars}/icon-not-image.png`;

  constructor(private formBuilder: FormBuilder) {
    this.carForm = this.formBuilder.group({
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      power: new FormControl('', [Validators.required]),
      fuel: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.carForm.controls.fuel.setValue(this.fuelTypes[0].value);
    this.carForm.controls.brand.setValue(this.brands[0].id);
  }
}
