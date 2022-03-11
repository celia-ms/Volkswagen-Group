import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { paths } from 'src/app/app-paths';
import { brandMock } from 'src/app/core/mocks/brand.mock';
import { Brand } from 'src/app/core/models/brand.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  brands: Brand[] = brandMock;

  columns: number = 4;
  rowHeight: string = '400px';
  gutterSize: string = '20px';

  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToCars(brand: Brand) {
    this.router.navigate([`${paths.car}/`, brand.id]);
  }
}
