import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogsComponent } from './components/logs/logs.component';

export const routes: Routes = [
    {
        path: 'dashboard', component: DashboardComponent,
    },
    {
        path: 'logs', component: LogsComponent
    },
    {
        path: '', redirectTo: '/dashboard', pathMatch: 'full'
    },
    {
        path: '**', redirectTo: '/dashboard', pathMatch: 'full'
    }
];
