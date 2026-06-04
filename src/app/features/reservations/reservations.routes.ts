import { Routes } from '@angular/router';

export const reservationsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./reservations-list-page.component').then(
        (m) => m.ReservationsListPageComponent
      ),
    data: {
      title: 'Reservations',
      subtitle:
        'Table, filters, tabs, and action menu scaffold from Figma Reservations List.',
    },
  },
  {
    path: 'step-1-guest',
    loadComponent: () =>
      import('./pages/new-reservation-step-1-guest/new-reservation-step-1-guest.component').then(
        (m) => m.NewReservationStep1GuestComponent
      ),
    data: {
      title: 'New Reservation',
      subtitle: 'Step 1 - Guest',
    },
  },
  {
    path: 'step-2-room-dates',
    loadComponent: () =>
      import('./pages/new-reservation-step-2-room-dates/new-reservation-step-2-room-dates.component').then(
        (m) => m.NewReservationStep2RoomDatesComponent
      ),
    data: {
      title: 'New Reservation',
      subtitle: 'Step 2 - Room & Dates',
    },
  },
  {
    path: 'step-3-rates-addons',
    loadComponent: () =>
      import('./pages/new-reservation-step-3-rates-addons/new-reservation-step-3-rates-addons.component').then(
        (m) => m.NewReservationStep3RatesAddonsComponent
      ),
    data: {
      title: 'New Reservation',
      subtitle: 'Step 3 - Rates & Add-ons',
    },
  },
  {
    path: 'step-4-payment',
    loadComponent: () =>
      import('./pages/new-reservation-step-4-payment/new-reservation-step-4-payment.component').then(
        (m) => m.NewReservationStep4PaymentComponent
      ),
    data: {
      title: 'New Reservation',
      subtitle: 'Step 4 - Payment',
    },
  },
  {
    path: 'step-5-confirmation',
    loadComponent: () =>
      import('./pages/new-reservation-step-5-confirmation/new-reservation-step-5-confirmation.component').then(
        (m) => m.NewReservationStep5ConfirmationComponent
      ),
    data: {
      title: 'New Reservation',
      subtitle: 'Step 5 - Confirmation',
    },
  },
];
