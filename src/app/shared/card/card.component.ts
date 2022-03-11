import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { getCurrencyFormat } from 'src/app/core/helpers/currency.format.helpers';

@Component({
  template: '',
})
export abstract class CardComponent {
  @Input('item') item!: any;

  @Output() selectClick = new EventEmitter();

  select() {
    this.selectClick.emit(this.item);
  }

  constructor() {}

  ngOnInit(): void {}
}

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
})
export class CardImageComponent extends CardComponent implements OnInit {
  ngOnInit(): void {}
}

@Component({
  selector: 'app-card-data',
  templateUrl: './card-data.component.html',
})
export class CardDataComponent extends CardComponent implements OnInit {
  currency: string = '';

  ngOnInit(): void {
    this.currency = getCurrencyFormat(this.item.price);
  }
}
