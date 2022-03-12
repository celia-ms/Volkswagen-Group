import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material/material.module';
import { CardDataComponent, CardImageComponent } from './card/card.component';
import { DialogComponent } from './dialog/dialog.component';
import { FilterComponent } from './filter/filter.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    CardImageComponent,
    CardDataComponent,
    FilterComponent,
    MessageComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CardImageComponent,
    CardDataComponent,
    FilterComponent,
    MessageComponent,
    DialogComponent,
  ],
})
export class SharedModule {}
