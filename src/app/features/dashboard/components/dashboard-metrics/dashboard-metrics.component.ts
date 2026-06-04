import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MetricCard } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-metrics.component.html',
  styleUrl: './dashboard-metrics.component.css',
})
export class DashboardMetricsComponent {
  @Input({ required: true }) cards: MetricCard[] = [];
}
