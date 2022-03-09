import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';

const MATERIAL_COMPONENTS = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatToolbarModule,
  MatExpansionModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatSelectModule,
  MatBadgeModule,
  MatMenuModule,
  MatTabsModule,
  MatButtonToggleModule,
  MatTooltipModule,
  MatTableModule,
  MatSortModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatCardModule,
  MatProgressBarModule,
  MatChipsModule,
  MatGridListModule,
  MatFormFieldModule,
];
@NgModule({
  declarations: [],
  imports: [CommonModule, MATERIAL_COMPONENTS],
  exports: [MATERIAL_COMPONENTS],
})
export class MaterialModule {}
