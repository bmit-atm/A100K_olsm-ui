import { Component, OnInit } from '@angular/core';
import { MainComponent } from './components/layout/main/main.component';
import { MatFormField } from '@angular/material/form-field';

// Angular Material Components
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AuthServiceService } from './services/auth-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent{
 
}
