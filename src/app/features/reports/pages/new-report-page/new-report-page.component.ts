import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ReportCategory } from '../../models/report.model';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-new-report-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './new-report-page.component.html',
  styleUrl: './new-report-page.component.css',
})
export class NewReportPageComponent {
  readonly categoryOptions: ReportCategory[];
  readonly formatOptions: Array<'PDF' | 'XLSX' | 'CSV'> = ['PDF', 'XLSX', 'CSV'];

  name = '';
  category: ReportCategory = 'Revenue';
  period = 'This Month';
  owner = 'Revenue Team';
  format: 'PDF' | 'XLSX' | 'CSV' = 'PDF';
  summary = '';
  errorMessage = '';

  constructor(
    private readonly reportsService: ReportsService,
    private readonly router: Router
  ) {
    this.categoryOptions = this.reportsService.getCategoryOptions();
  }

  saveReport(): void {
    if (!this.name.trim()) {
      this.errorMessage = 'Report name is required.';
      return;
    }

    const report = this.reportsService.addReport({
      name: this.name,
      category: this.category,
      period: this.period,
      owner: this.owner,
      format: this.format,
      summary: this.summary,
    });

    this.router.navigate(['/reports/view-report', report.id]);
  }
}
