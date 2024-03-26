import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogsComponent } from './components/logs/logs.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: 'dashboard', component: DashboardComponent,
    },
    {
        path: 'logs', component: LogsComponent
    },
    {
        path: 'login', component: LoginComponent
    }
];
