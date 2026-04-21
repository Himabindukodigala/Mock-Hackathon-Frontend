import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManagerDashboard } from './manager-dashboard/manager-dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ManagerDashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend');
}
