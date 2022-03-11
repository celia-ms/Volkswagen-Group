import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private readonly CONFIG_SNACKBAR_SUCCESS: MatSnackBarConfig = {
    duration: 3000,
    panelClass: ['snackbar-success'],
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };
  private readonly CONFIG_SNACKBAR_ERROR: MatSnackBarConfig = {
    duration: 6000,
    panelClass: ['snackbar-error'],
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };
  private readonly CONFIG_SNACKBAR_WARNING: MatSnackBarConfig = {
    panelClass: ['snackbar-warning'],
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };

  constructor(
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  public success(text: string) {
    this.snackBar.open(
      this.translate.instant(text),
      'X',
      this.CONFIG_SNACKBAR_SUCCESS
    );
  }

  public error(text: string) {
    this.snackBar.open(
      this.translate.instant(text),
      'X',
      this.CONFIG_SNACKBAR_ERROR
    );
  }

  public warning(text: string) {
    this.snackBar.open(
      this.translate.instant(text),
      'X',
      this.CONFIG_SNACKBAR_WARNING
    );
  }
}
