import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormField, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe(
        (response) => {
          localStorage.setItem('access_token', response.token);
          localStorage.setItem('user', JSON.stringify(username));  // Speichern Sie die Benutzerinformationen
          // Erfolgreicher Login, weiterleiten oder andere Aktionen durchführen
          this.router.navigate(['dashboard']);
          this.snackbarService.openSnackBar({
            text: 'erfolgreich eingeloggt!',
            color: 'success',
          });
          
        },
        error => {
          this.snackbarService.openSnackBar({
            text: 'Fehler beim Einloggen!',
            color: 'error',
          });
        }
      );
    }
  }
   
}
