import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MaterialModule } from 'src/app/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    DashboardRoutingModule,
    SharedModule,
  ],
})
export class DashboardModule {}
