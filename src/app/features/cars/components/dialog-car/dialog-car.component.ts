import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Car } from 'src/app/core/models/car.model';
import { DialogConfig } from 'src/app/core/models/dialog-config.model';

@Component({
  selector: 'app-dialog-car',
  templateUrl: './dialog-car.component.html',
})
export class DialogCarComponent implements OnInit {
  @ViewChild('dialog', { static: true }) dialog: any;

  @Output() closeClick = new EventEmitter();

  car!: Car;

  dialogConfig: DialogConfig = {
    title: 'car.dialog.display',
    width: '40vw',
    height: '40vh',
    showCancelButton: false,
    showConfirmButton: false,
  };

  constructor() {}

  ngOnInit(): void {}

  open() {
    this.dialog.open();
  }

  close() {}
}
