import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { paths } from 'src/app/app-paths';
import { CarsComponent } from './pages/cars/cars.component';

const routes: Routes = [
  {
    path: '',
    component: CarsComponent,
  },
  {
    path: paths.id,
    component: CarsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarsRoutingModule {}
