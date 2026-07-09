import { Routes } from '@angular/router';

export const ratesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./rate-management-page.component').then(
        (m) => m.RateManagementPageComponent
      ),
    data: {
      title: 'Rate Management',
      subtitle: 'Rate plans and packages.',
    },
  },
  {
    path: 'new-rate-plan',
    loadComponent: () =>
      import('./pages/new-rate-plan-page/new-rate-plan-page.component').then(
        (m) => m.NewRatePlanPageComponent
      ),
    data: {
      title: 'New Rate Plan',
      subtitle: 'Create a selling strategy for a room and date segment.',
    },
  },
  {
    path: 'promo-codes',
    loadComponent: () =>
      import('./pages/promo-codes-page/promo-codes-page.component').then(
        (m) => m.PromoCodesPageComponent
      ),
    data: {
      title: 'Promo Codes',
      subtitle: 'Configure offers, validity windows, and usage controls.',
    },
  },
  {
    path: 'view-rate-plan/:code',
    loadComponent: () =>
      import('./pages/view-rate-plan-page/view-rate-plan-page.component').then(
        (m) => m.ViewRatePlanPageComponent
      ),
    data: {
      title: 'View Rate Plan',
      subtitle: 'Read-only plan details and distribution settings.',
    },
  },
  {
    path: 'edit-rate-plan/:code',
    loadComponent: () =>
      import('./pages/edit-rate-plan-page/edit-rate-plan-page.component').then(
        (m) => m.EditRatePlanPageComponent
      ),
    data: {
      title: 'Edit Rate Plan',
      subtitle: 'Adjust plan pricing and booking rules.',
    },
  },
  {
    path: 'add-promo-code',
    loadComponent: () =>
      import('./pages/add-promo-code-page/add-promo-code-page.component').then(
        (m) => m.AddPromoCodePageComponent
      ),
    data: {
      title: 'Add Promo Code',
      subtitle: 'Configure discount rules and redemption windows.',
    },
  },
  {
    path: 'view-promo-code/:code',
    loadComponent: () =>
      import('./pages/view-promo-code-page/view-promo-code-page.component').then(
        (m) => m.ViewPromoCodePageComponent
      ),
    data: {
      title: 'View Promo Code',
      subtitle: 'Read-only discount and eligibility details.',
    },
  },
  {
    path: 'edit-promo-code/:code',
    loadComponent: () =>
      import('./pages/edit-promo-code-page/edit-promo-code-page.component').then(
        (m) => m.EditPromoCodePageComponent
      ),
    data: {
      title: 'Edit Promo Code',
      subtitle: 'Update validity, usage limits, and conditions.',
    },
  },
];