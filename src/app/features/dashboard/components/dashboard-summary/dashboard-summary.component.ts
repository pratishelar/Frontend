import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-summary.component.html',
  styleUrl: './dashboard-summary.component.css',
})
export class DashboardSummaryComponent {
  @Input({ required: true }) revenueBars: number[] = [];
}
