import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarsComponent } from './pages/cars/cars.component';
import { CarsRoutingModule } from './cars-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [CarsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    CarsRoutingModule,
    SharedModule,
    InfiniteScrollModule,
  ],
})
export class CarsModule {}
