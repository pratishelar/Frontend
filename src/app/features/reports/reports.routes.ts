import { Routes } from '@angular/router';

export const reportsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./reports-page.component').then((m) => m.ReportsPageComponent),
    data: {
      title: 'Reports',
      subtitle: 'Operational, occupancy, revenue, and guest analytics reports.',
    },
  },
  {
    path: 'new-report',
    loadComponent: () =>
      import('./pages/new-report-page/new-report-page.component').then(
        (m) => m.NewReportPageComponent
      ),
    data: {
      title: 'New Report',
      subtitle: 'Create and configure a report definition.',
    },
  },
  {
    path: 'view-report/:id',
    loadComponent: () =>
      import('./pages/view-report-page/view-report-page.component').then(
        (m) => m.ViewReportPageComponent
      ),
    data: {
      title: 'View Report',
      subtitle: 'Read-only report metadata and export details.',
    },
  },
];
