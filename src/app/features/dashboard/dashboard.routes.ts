import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard-page.component').then((m) => m.DashboardPageComponent),
    data: {
      title: 'Dashboard',
      subtitle:
        'Figma screen scaffold for KPI cards, occupancy chart, room status, and tasks.',
    },
  },
];
