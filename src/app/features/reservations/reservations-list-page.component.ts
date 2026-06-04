import { Component } from '@angular/core';
import { ReservationsFiltersComponent } from './components/reservations-filters/reservations-filters.component';
import { ReservationsTabsComponent } from './components/reservations-tabs/reservations-tabs.component';
import { ReservationsTableComponent } from './components/reservations-table/reservations-table.component';
import { Reservation } from './models/reservation.model';

@Component({
  selector: 'app-reservations-list-page',
  standalone: true,
  imports: [
    ReservationsFiltersComponent,
    ReservationsTabsComponent,
    ReservationsTableComponent,
  ],
  templateUrl: './reservations-list-page.component.html',
  styleUrl: './reservations-list-page.component.css',
})
export class ReservationsListPageComponent {
  readonly tabs = ['All (48)', 'Arriving (12)', 'Departing (8)', 'In-house (22)', 'Cancelled (6)', 'No-show (2)', 'Pending (2)'];
  activeTab = 'All (48)';

  readonly reservations: Reservation[] = [
    {
      confNo: '#RES-001',
      initials: 'JS',
      guest: 'John Smith',
      email: 'john.smith@email.com',
      room: '201 · Deluxe',
      checkIn: '29 May',
      checkOut: '02 Jun',
      nights: 4,
      amount: '$680',
      payment: 'Paid',
      status: 'Confirmed',
      source: 'Direct',
      ratePlan: 'Flexible',
    },
    {
      confNo: '#RES-002',
      initials: 'MG',
      guest: 'Maria Garcia',
      email: 'maria@email.com',
      room: '305 · Suite',
      checkIn: '28 May',
      checkOut: '29 May',
      nights: 1,
      amount: '$220',
      payment: 'Paid',
      status: 'Checkout Due',
      source: 'Booking.com',
      ratePlan: 'Standard',
    },
    {
      confNo: '#RES-003',
      initials: 'RP',
      guest: 'Raj Patel',
      email: 'raj@email.com',
      room: '412 · Standard',
      checkIn: '29 May',
      checkOut: '01 Jun',
      nights: 3,
      amount: '$390',
      payment: 'Paid',
      status: 'Confirmed',
      source: 'Expedia',
      ratePlan: 'Standard',
    },
    {
      confNo: '#RES-004',
      initials: 'LW',
      guest: 'Lisa Wong',
      email: 'wali-lin@email.com',
      room: '118 · Standard',
      checkIn: '29 May',
      checkOut: '30 May',
      nights: 1,
      amount: '$150',
      payment: 'Pending',
      status: 'In Progress',
      source: 'Walk-in',
      ratePlan: 'Walk-in',
    },
    {
      confNo: '#RES-005',
      initials: 'CR',
      guest: 'Carlos Ruiz',
      email: 'carlos.ruiz@email.com',
      room: '220 · Deluxe',
      checkIn: '25 May',
      checkOut: '29 May',
      nights: 4,
      amount: '$640',
      payment: 'Refunded',
      status: 'Cancelled',
      source: 'Airbnb',
      ratePlan: 'Standard',
    },
    {
      confNo: '#RES-006',
      initials: 'PK',
      guest: 'Priya Kumar',
      email: 'priya@email.com',
      room: '103 · Standard',
      checkIn: '31 May',
      checkOut: '02 Jun',
      nights: 2,
      amount: '$260',
      payment: 'Paid',
      status: 'Confirmed',
      source: 'Direct',
      ratePlan: 'Gold Member',
    },
    {
      confNo: '#RES-007',
      initials: 'JL',
      guest: 'James Lee',
      email: 'james@email.com',
      room: '302 · Suite',
      checkIn: '01 Jun',
      checkOut: '05 Jun',
      nights: 4,
      amount: '$996',
      payment: 'Paid',
      status: 'Confirmed',
      source: 'Direct',
      ratePlan: 'Standard',
    },
    {
      confNo: '#RES-008',
      initials: 'AS',
      guest: 'Ana Santos',
      email: 'ana@email.com',
      room: '201 · Deluxe',
      checkIn: '06 Jun',
      checkOut: '09 Jun',
      nights: 3,
      amount: '$510',
      payment: 'Paid',
      status: 'Confirmed',
      source: 'Booking.com',
      ratePlan: 'Standard',
    },
    {
      confNo: '#RES-009',
      initials: 'TK',
      guest: 'Tom Kim',
      email: 'tom@email.com',
      room: '204 · Deluxe',
      checkIn: '28 May',
      checkOut: '31 May',
      nights: 3,
      amount: '$480',
      payment: 'Paid',
      status: 'Confirmed',
      source: 'Expedia',
      ratePlan: 'Corporate',
    },
    {
      confNo: '#RES-010',
      initials: 'AC',
      guest: 'Alice Chen',
      email: 'alice@email.com',
      room: '301 · Suite',
      checkIn: '02 Jun',
      checkOut: '06 Jun',
      nights: 4,
      amount: '$1,100',
      payment: 'Invoiced',
      status: 'Confirmed',
      source: 'Direct',
      ratePlan: 'Corporate',
    },
    {
      confNo: '#RES-011',
      initials: 'DP',
      guest: 'David Park',
      email: 'dpark@email.com',
      room: '105 · Standard',
      checkIn: '30 May',
      checkOut: '01 Jun',
      nights: 2,
      amount: '$260',
      payment: 'Pending',
      status: 'Pending',
      source: 'Booking.com',
      ratePlan: 'Early Bird',
    },
    {
      confNo: '#RES-012',
      initials: 'SM',
      guest: 'Sophie Martin',
      email: 'sophie@email.com',
      room: '202 · Deluxe',
      checkIn: '01 Jun',
      checkOut: '05 Jun',
      nights: 4,
      amount: '$720',
      payment: 'Paid',
      status: 'Confirmed',
      source: 'Airbnb',
      ratePlan: 'Weekend Pkg',
    },
    {
      confNo: '#RES-013',
      initials: 'RJ',
      guest: 'Robert Johnson',
      email: 'rjohnson@email.com',
      room: '106 · Standard',
      checkIn: '03 Jun',
      checkOut: '07 Jun',
      nights: 4,
      amount: '$520',
      payment: 'Paid',
      status: 'Confirmed',
      source: 'Direct',
      ratePlan: 'Standard',
    },
    {
      confNo: '#RES-014',
      initials: 'EW',
      guest: 'Emma Wilson',
      email: 'emma@email.com',
      room: '303 · Suite',
      checkIn: '05 Jun',
      checkOut: '08 Jun',
      nights: 3,
      amount: '$900',
      payment: 'Deposit',
      status: 'Confirmed',
      source: 'Expedia',
      ratePlan: 'Advance Buy',
    },
  ];

  readonly pageSizes = ['10', '25', '50'];
  selectedPageSize = '10';
  readonly currentPage = 1;
  readonly totalPages = 5;

  get summary(): string {
    return `Showing 1-${this.reservations.length} of 48 reservations`;
  }

  onApplyFilters(): void {
    // Hook for real filter integration with API state.
  }

  onResetFilters(): void {
    // Hook for resetting filter form state.
  }

  onPageSizeChange(size: string): void {
    this.selectedPageSize = size;
  }

  onPreviousPage(): void {
    // Hook for pagination state transitions.
  }

  onNextPage(): void {
    // Hook for pagination state transitions.
  }
}
