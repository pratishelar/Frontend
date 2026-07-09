import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NewReportInput, ReportCategory, ReportItem, ReportStatus } from '../models/report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private readonly reportsSubject = new BehaviorSubject<ReportItem[]>([
    {
      id: 'RPT-1001',
      name: 'Daily Revenue Snapshot',
      category: 'Revenue',
      period: 'Today',
      generatedOn: '2026-06-07',
      owner: 'Front Office',
      format: 'PDF',
      status: 'Ready',
      summary: 'Room revenue, ancillary revenue and tax breakdown.',
    },
    {
      id: 'RPT-1002',
      name: 'Occupancy Trend - 30 Days',
      category: 'Occupancy',
      period: 'Last 30 Days',
      generatedOn: '2026-06-06',
      owner: 'Revenue Team',
      format: 'XLSX',
      status: 'Ready',
      summary: 'Daily occupancy trend with weekday vs weekend split.',
    },
    {
      id: 'RPT-1003',
      name: 'Housekeeping Productivity',
      category: 'Operations',
      period: 'This Month',
      generatedOn: '2026-06-05',
      owner: 'Housekeeping',
      format: 'CSV',
      status: 'Scheduled',
      summary: 'Turnover time, cleaned rooms, and backlog aging.',
    },
    {
      id: 'RPT-1004',
      name: 'Guest Satisfaction Summary',
      category: 'Guest Experience',
      period: 'Q2 2026',
      generatedOn: '2026-06-01',
      owner: 'GM Office',
      format: 'PDF',
      status: 'Draft',
      summary: 'Review sentiment and service recovery cases.',
    },
  ]);

  readonly reports$ = this.reportsSubject.asObservable();

  getReports(): ReportItem[] {
    return [...this.reportsSubject.value];
  }

  getReportById(id: string): ReportItem | undefined {
    return this.reportsSubject.value.find((item) => item.id === id);
  }

  addReport(input: NewReportInput): ReportItem {
    const id = `RPT-${String(1000 + this.reportsSubject.value.length + 1)}`;

    const report: ReportItem = {
      id,
      name: input.name.trim(),
      category: input.category,
      period: input.period.trim(),
      generatedOn: new Date().toISOString().slice(0, 10),
      owner: input.owner.trim(),
      format: input.format,
      status: 'Draft',
      summary: input.summary.trim() || 'No summary provided.',
    };

    this.reportsSubject.next([report, ...this.reportsSubject.value]);
    return report;
  }

  getCategoryOptions(): ReportCategory[] {
    return ['Revenue', 'Occupancy', 'Operations', 'Guest Experience'];
  }

  getStatusOptions(): Array<'All' | ReportStatus> {
    return ['All', 'Ready', 'Scheduled', 'Draft'];
  }
}
