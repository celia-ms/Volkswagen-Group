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
  rowHeight: string = '420px';
  gutterSize: string = '20px';

  constructor(private router: Router) {}

  ngOnInit() {
    this.setDimensions(window);
  }

  navigateToCars(brand: Brand) {
    this.router.navigate([`${paths.car}/`, brand.id]);
  }

  setDimensions(event: any) {
    const width = event.innerWidth;
    if (width < 992) {
      this.refreshDimensions(1, '300px', '12px');
    } else {
      if (width >= 992 && width < 1600) {
        this.refreshDimensions(2, '340px', '14px');
      } else {
        this.refreshDimensions(4, '380px', '16px');
      }
    }
  }

  refreshDimensions(columns: number, rowHeight: string, gutterSize: string) {
    this.columns = columns;
    this.rowHeight = rowHeight;
    this.gutterSize = gutterSize;
  }
}
