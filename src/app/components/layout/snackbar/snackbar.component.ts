import { Component, Inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [NgIf, MatButtonModule, MatIconModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.sass'
})
export class SnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBar: MatSnackBar
  ) {}


  onClose() {
    this.snackBar.dismiss();
  }
}
