import { Component, OnInit } from '@angular/core';
import { brandMock } from 'src/app/core/mocks/brand.mock';
import { Brand } from 'src/app/core/models/brand.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  brands: Brand[] = brandMock;

  columns: number = 4;
  rowHeight: string = '400px';
  gutterSize: string = '20px';

  constructor() {}

  ngOnInit() {}

  selectBrand(brand: Brand) {}
}
