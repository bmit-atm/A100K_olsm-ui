import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpTokenService } from '../../services/http-token.service';
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
    private httpTokenService: HttpTokenService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.httpTokenService.getCrsfToken().subscribe(
      (x) => {
        console.log('CSRF token:', x);
        if (this.loginForm.valid) {
          const credentials = this.loginForm.value;
          this.authService.login(credentials).subscribe(
            () => {
              // Erfolgreicher Login, weiterleiten oder andere Aktionen durchführen
              this.router.navigate(['dashboard']);
            },
            error => {
              // Fehlerbehandlung für fehlgeschlagenen Login
              console.error('Login failed:', error);
            }
          );
        }
      },
      error => {
        console.error('Failed to get CSRF token:', error);
      }
    );
   
  }

}
