import { Routes } from '@angular/router';

export const checkInRoutes: Routes = [
  {
    path: 'queue',
    loadComponent: () =>
      import('./pages/arrivals-queue/arrivals-queue-page.component').then(
        (m) => m.ArrivalsQueuePageComponent
      ),
    data: {
      title: 'Check-in',
      subtitle: "Friday, 29 May 2026 • Today's Arrivals",
    },
  },
  {
    path: 'verify-assign',
    loadComponent: () =>
      import('./pages/verify-assign/verify-assign-page.component').then(
        (m) => m.VerifyAssignPageComponent
      ),
    data: {
      title: 'Check-in: John Smith',
      subtitle: '#RES-2026-0049 • 201 Deluxe King • 4 nights',
    },
  },
  {
    path: 'complete',
    loadComponent: () =>
      import('./pages/check-in-complete/check-in-complete-page.component').then(
        (m) => m.CheckInCompletePageComponent
      ),
    data: {
      title: 'Check-in Successful',
      subtitle: 'John Smith has been checked in to Room 201',
    },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'queue',
  },
];
