import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
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
    private authService: AuthServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
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
        },
        error => {
          // Fehlerbehandlung für fehlgeschlagenen Login
          console.error('Login failed:', error);
        }
      );
    }
  }
   
}
