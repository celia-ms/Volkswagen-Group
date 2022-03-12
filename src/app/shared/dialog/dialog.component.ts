import {
  ViewChild,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogConfig } from 'src/app/core/models/dialog-config.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  @ViewChild('dialog', { static: true }) dialog: any;
  dialogRef!: MatDialogRef<any>;

  @Input() config: DialogConfig = {
    title: '',
    width: '60vw',
    height: '90vh',
    showCancelButton: false,
    showConfirmButton: false,
  };

  @Output() closeClick = new EventEmitter();
  @Output() cancelClick = new EventEmitter();
  @Output() confirmClick = new EventEmitter();

  constructor(public matDialog: MatDialog) {}

  open(): void {
    this.dialogRef = this.matDialog.open(this.dialog, {
      width: this.config.width,
      height: this.config.height,
      backdropClass: 'dialog-backdrop',
    });
  }

  cancel() {
    this.cancelClick.emit();
    this.dialogRef.close();
  }

  confirm() {
    this.confirmClick.emit();
  }

  success() {
    this.dialogRef.close();
  }

  close() {
    this.closeClick.emit();
    this.dialogRef.close();
  }
}
