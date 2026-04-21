import { Routes } from '@angular/router';
import { TentantDashboard } from './tentant-dashboard/tentant-dashboard';
import { ManagerDashboard } from './manager-dashboard/manager-dashboard';

export const routes: Routes = [
    { path: '', redirectTo: '/tenant-dashboard', pathMatch: 'full' },
    { path: 'tenant-dashboard', component: TentantDashboard },
{path: 'manager-dashboard', component: ManagerDashboard }
];
