import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material/material.module';
import { CardDataComponent, CardImageComponent } from './card/card.component';

@NgModule({
  declarations: [CardImageComponent, CardDataComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CardImageComponent, CardDataComponent],
})
export class SharedModule {}
