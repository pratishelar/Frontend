import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReservationStepperItem, SummaryLineItem } from '../../models/reservation-flow.model';

interface RoomTypeCard {
  name: string;
  label: string;
  availability: string;
  rate: string;
  selected?: boolean;
  badge?: string;
}

@Component({
  selector: 'app-new-reservation-step-2-room-dates',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './new-reservation-step-2-room-dates.component.html',
  styleUrl: './new-reservation-step-2-room-dates.component.css',
})
export class NewReservationStep2RoomDatesComponent {
  readonly steps: ReservationStepperItem[] = [
    { label: 'Guest', done: true },
    { label: 'Room & Dates', active: true },
    { label: 'Rates & Add-ons' },
    { label: 'Payment' },
    { label: 'Confirm' },
  ];

  readonly roomTypes: RoomTypeCard[] = [
    { name: 'Standard', label: 'King / Queen', availability: '8 avail', rate: '$129–$149/nt' },
    { name: 'Deluxe', label: 'King / Twin', availability: '3 avail', rate: '$189–$219/nt', selected: true },
    { name: 'Suite', label: 'Junior / Ocean', availability: '2 avail', rate: '$289–$349/nt' },
  ];

  readonly bookingSummary: SummaryLineItem[] = [
    { label: 'Room', value: '201 - Deluxe King' },
    { label: 'Check-in', value: 'Fri, 29 May 2026' },
    { label: 'Check-out', value: 'Tue, 02 Jun 2026' },
    { label: 'Duration', value: '4 nights' },
    { label: 'Guests', value: '2 Adults' },
    { label: 'Source', value: 'Direct / Front Desk' },
  ];
}
