import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReservationStepperItem } from '../../models/reservation-flow.model';

@Component({
  selector: 'app-new-reservation-step-5-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './new-reservation-step-5-confirmation.component.html',
  styleUrl: './new-reservation-step-5-confirmation.component.css',
})
export class NewReservationStep5ConfirmationComponent {
  readonly steps: ReservationStepperItem[] = [
    { label: 'Guest', done: true },
    { label: 'Room & Dates', done: true },
    { label: 'Rates & Add-ons', done: true },
    { label: 'Payment', done: true },
    { label: 'Confirm', active: true },
  ];

  readonly checklist = [
    { text: 'Reservation confirmed & reference generated', done: true },
    { text: 'Confirmation email sent to guest', done: true },
    { text: 'Room assigned & prepared by housekeeping', done: false },
    { text: 'Welcome amenity ordered', done: false },
    { text: 'Valet parking team notified', done: false },
    { text: 'Pre-arrival message sent (T-2 days)', done: false },
    { text: 'Online check-in link sent (T-1 day)', done: false },
    { text: 'Guest checked in at front desk', done: false },
  ];

  readonly actions = [
    { label: 'Print', icon: 'bi-printer' },
    { label: 'Email Guest', icon: 'bi-envelope' },
    { label: 'View Reservation', icon: 'bi-journal-text' },
    { label: 'Check In Now', icon: 'bi-check-lg' },
  ];
}
