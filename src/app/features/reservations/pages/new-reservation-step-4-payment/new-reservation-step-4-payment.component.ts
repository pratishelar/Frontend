import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReservationStepperItem } from '../../models/reservation-flow.model';

@Component({
  selector: 'app-new-reservation-step-4-payment',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './new-reservation-step-4-payment.component.html',
  styleUrl: './new-reservation-step-4-payment.component.css',
})
export class NewReservationStep4PaymentComponent {
  readonly steps: ReservationStepperItem[] = [
    { label: 'Guest', done: true },
    { label: 'Room & Dates', done: true },
    { label: 'Rates & Add-ons', done: true },
    { label: 'Payment', active: true },
    { label: 'Confirm' },
  ];

  readonly paymentMethods = [
    { label: 'Credit / Debit Card', active: true },
    { label: 'Cash' },
    { label: 'Invoice' },
    { label: 'Loyalty Points' },
  ];

  readonly plans = [
    { title: 'Pay in Full Now', note: '$1,012.73 charged today', selected: true },
    { title: 'Pay Deposit Only', note: '$200 now, balance at check-in' },
    { title: 'Pay at Property', note: 'No charge now · full amount at arrival' },
  ];
}
