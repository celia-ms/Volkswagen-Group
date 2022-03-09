import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  @Input('item') item!: any;

  @Output() selectClick = new EventEmitter();

  select() {
    this.selectClick.emit(this.item);
  }

  constructor() {}

  ngOnInit(): void {}
}
