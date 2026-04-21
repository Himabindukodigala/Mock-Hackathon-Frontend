import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManagerDashboard } from './manager-dashboard/manager-dashboard';
import { TentantDashboard } from './tentant-dashboard/tentant-dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend');
}
