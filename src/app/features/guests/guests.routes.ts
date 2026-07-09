import { Routes } from '@angular/router';

export const guestsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./guest-profiles-page.component').then(
        (m) => m.GuestProfilesPageComponent
      ),
    data: {
      title: 'Guest Profiles',
      subtitle: 'Profiles, loyalty tiers, and stay preferences.',
    },
  },
  {
    path: 'add-guest',
    loadComponent: () =>
      import('./pages/add-guest-page/add-guest-page.component').then(
        (m) => m.AddGuestPageComponent
      ),
    data: {
      title: 'Add Guest',
      subtitle: 'Create a new guest profile and preference notes.',
    },
  },
  {
    path: 'view-guest/:id',
    loadComponent: () =>
      import('./pages/view-guest-page/view-guest-page.component').then(
        (m) => m.ViewGuestPageComponent
      ),
    data: {
      title: 'View Guest',
      subtitle: 'Read-only profile and historical details.',
    },
  },
  {
    path: 'edit-guest/:id',
    loadComponent: () =>
      import('./pages/edit-guest-page/edit-guest-page.component').then(
        (m) => m.EditGuestPageComponent
      ),
    data: {
      title: 'Edit Guest',
      subtitle: 'Update profile details and loyalty status.',
    },
  },
];
