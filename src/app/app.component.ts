import { Component, OnInit } from '@angular/core';
import { MainComponent } from './components/layout/main/main.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent{
  title: string = 'olsm-ui';
 
}
