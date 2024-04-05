import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogsComponent } from './components/logs/logs.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';

export const routes: Routes = [
    {
        path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuardService]
    },
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]
    },
    {
        path: 'logs', canActivate: [AuthGuardService], component: LogsComponent
    },
    {
        path: 'login', component: LoginComponent, canActivate: [LoginGuardService]
    }
];