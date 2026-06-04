import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FloorStatus, OccupancyPoint } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-analytics.component.html',
  styleUrl: './dashboard-analytics.component.css',
})
export class DashboardAnalyticsComponent {
  @Input({ required: true }) occupancy: OccupancyPoint[] = [];
  @Input({ required: true }) floors: FloorStatus[] = [];
}
