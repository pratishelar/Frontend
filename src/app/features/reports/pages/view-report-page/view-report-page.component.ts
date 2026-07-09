import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReportItem } from '../../models/report.model';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-view-report-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-report-page.component.html',
  styleUrl: './view-report-page.component.css',
})
export class ViewReportPageComponent {
  report?: ReportItem;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly reportsService: ReportsService
  ) {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.report = this.reportsService.getReportById(id);
  }
}
