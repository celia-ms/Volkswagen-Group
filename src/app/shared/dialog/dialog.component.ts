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

  @Output() closeClick = new EventEmitter<string>();
  @Output() cancelclick = new EventEmitter<string>();
  @Output() confirmclick = new EventEmitter<string>();

  constructor(public matDialog: MatDialog) {}

  open(): void {
    this.dialogRef = this.matDialog.open(this.dialog, {
      width: this.config.width,
      height: this.config.height,
      backdropClass: 'dialog-backdrop',
    });
  }

  cancel() {
    this.cancelclick.emit();
    this.dialogRef.close();
  }

  confirm() {
    this.confirmclick.emit();
    this.dialogRef.close();
  }

  close() {
    this.closeClick.emit();
    this.dialogRef.close();
  }
}
