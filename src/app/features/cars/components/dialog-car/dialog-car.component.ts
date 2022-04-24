import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { actions } from 'src/app/constants/constants';
import { DialogConfig } from 'src/app/core/models/dialog-config.model';

@Component({
  selector: 'app-dialog-car',
  templateUrl: './dialog-car.component.html',
})
export class DialogCarComponent implements OnInit {
  @ViewChild('dialog', { static: true }) dialog: any;
  @ViewChild('formCar', { static: true }) formCar: any;

  @Output() closeClick = new EventEmitter();
  @Output() confirmClick = new EventEmitter();

  actions: typeof actions = actions;

  action!: number;

  dialogConfig: DialogConfig = {
    title: 'car.dialog.display',
    width: '40vw',
    height: '60vh',
    showCancelButton: true,
    showConfirmButton: true,
    confirmText: 'dialog.buttons.save',
    backdropClass: 'dialog-car-container',
  };

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}

  open(action: number) {
    this.action = action;
    this.formCar.resetForm();
    switch (this.action) {
      case actions.SHOW:
        this.dialogConfig.title = `${this.translateService.instant(
          'card.menu.show'
        )} ${this.translateService.instant('car.dialog.display')}`;
        this.dialogConfig.showCancelButton = false;
        this.dialogConfig.showConfirmButton = false;
        break;
      case actions.EDIT:
        this.dialogConfig.title = `${this.translateService.instant(
          'card.menu.edit'
        )} ${this.translateService.instant('car.dialog.display')}`;
        this.dialogConfig.showCancelButton = true;
        this.dialogConfig.showConfirmButton = true;
        break;
      case actions.NEW:
        this.dialogConfig.title = `${this.translateService.instant(
          'card.menu.new'
        )} ${this.translateService.instant('car.dialog.display')}`;
        this.dialogConfig.showCancelButton = true;
        this.dialogConfig.showConfirmButton = true;
        break;
    }
    this.dialog.open(this.dialogConfig);
  }

  saveCar() {
    const isSave = this.formCar.saveForm();
    if (isSave) {
      this.dialog.success();
      this.confirmClick.emit();
    }
  }

  close() {
    this.closeClick.emit();
  }
}
