import { Routes } from '@angular/router';

export const checkOutRoutes: Routes = [
  {
    path: 'queue',
    loadComponent: () =>
      import('./pages/departures-queue/departures-queue-page.component').then(
        (m) => m.DeparturesQueuePageComponent
      ),
    data: {
      title: 'Check-out',
      subtitle: "Friday, 29 May 2026 • Today's Departures",
    },
  },
  {
    path: 'folio-review',
    loadComponent: () =>
      import('./pages/folio-review/folio-review-page.component').then(
        (m) => m.FolioReviewPageComponent
      ),
    data: {
      title: 'Check-out: Maria Garcia',
      subtitle: '#RES-0002 · Room 305 Suite · 1 night · Due: 11:00 AM (Overdue 8 min)',
    },
  },
  {
    path: 'complete',
    loadComponent: () =>
      import('./pages/check-out-complete/check-out-complete-page.component').then(
        (m) => m.CheckOutCompletePageComponent
      ),
    data: {
      title: 'Check-out Complete!',
      subtitle: 'Maria Garcia · Room 305 · 29 May 2026, 11:08 AM · Stayed 1 night',
    },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'queue',
  },
];
