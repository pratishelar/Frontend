import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TaskRow } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-tasks.component.html',
  styleUrl: './dashboard-tasks.component.css',
})
export class DashboardTasksComponent {
  @Input({ required: true }) tasks: TaskRow[] = [];
}
