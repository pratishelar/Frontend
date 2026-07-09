export type ReportCategory =
  | 'Revenue'
  | 'Occupancy'
  | 'Operations'
  | 'Guest Experience';

export type ReportStatus = 'Ready' | 'Scheduled' | 'Draft';

export interface ReportItem {
  id: string;
  name: string;
  category: ReportCategory;
  period: string;
  generatedOn: string;
  owner: string;
  format: 'PDF' | 'XLSX' | 'CSV';
  status: ReportStatus;
  summary: string;
}

export interface NewReportInput {
  name: string;
  category: ReportCategory;
  period: string;
  owner: string;
  format: 'PDF' | 'XLSX' | 'CSV';
  summary: string;
}
