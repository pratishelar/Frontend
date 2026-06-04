import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GuestSummaryCard, ReservationStepperItem, SummaryLineItem } from '../../models/reservation-flow.model';

@Component({
  selector: 'app-new-reservation-step-1-guest',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './new-reservation-step-1-guest.component.html',
  styleUrl: './new-reservation-step-1-guest.component.css',
})
export class NewReservationStep1GuestComponent {
  readonly steps: ReservationStepperItem[] = [
    { label: 'Guest', done: false, active: true },
    { label: 'Room & Dates' },
    { label: 'Rates & Add-ons' },
    { label: 'Payment' },
    { label: 'Confirm' },
  ];

  readonly guestCards: GuestSummaryCard[] = [
    {
      initials: 'JS',
      name: 'John Smith',
      tag: 'Gold Member · 12 stays',
      details: 'john.smith@email.com · +1 416 555 0123',
    },
    {
      initials: 'MG',
      name: 'Maria Garcia',
      tag: 'Silver Member · 5 stays',
      details: 'maria@email.com · +34 91 555 2345',
    },
    {
      initials: 'RP',
      name: 'Raj Patel',
      tag: 'Bronze Member · 3 stays',
      details: 'raj.patel@email.com · +1 647 555 9876',
    },
  ];

  readonly bookingSummary: SummaryLineItem[] = [
    { label: 'Member Since', value: 'March 2024' },
    { label: 'Total Stays', value: '12' },
    { label: 'Total Spent', value: '$4,820' },
    { label: 'Loyalty Points', value: '1,200 pts' },
    { label: 'Preferred Room', value: 'Deluxe King' },
    { label: 'Preferred Floor', value: 'High (3rd+)' },
    { label: 'Dietary', value: 'Vegetarian' },
    { label: 'Pillow', value: 'Soft' },
  ];
}
