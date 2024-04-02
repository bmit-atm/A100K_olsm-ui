import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/layout/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) {}
  public openSnackBar(
    data: { text: string; color: string } = { text: '', color: '' }
  ) {
    this.snackbar.openFromComponent(SnackbarComponent, {
      verticalPosition: 'bottom',
      horizontalPosition: 'end',
      data: data,
      duration: 4 * 1000, //4 seconds
    });
  }
}
