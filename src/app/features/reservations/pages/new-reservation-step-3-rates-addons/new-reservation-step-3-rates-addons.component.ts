import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReservationStepperItem, SummaryLineItem } from '../../models/reservation-flow.model';

interface RatePlanCard {
  name: string;
  label: string;
  note: string;
  weekday: string;
  weekend: string;
  selected?: boolean;
  badge?: string;
}

interface AddOnCard {
  name: string;
  description: string;
  price: string;
  selected?: boolean;
}

@Component({
  selector: 'app-new-reservation-step-3-rates-addons',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './new-reservation-step-3-rates-addons.component.html',
  styleUrl: './new-reservation-step-3-rates-addons.component.css',
})
export class NewReservationStep3RatesAddonsComponent {
  readonly steps: ReservationStepperItem[] = [
    { label: 'Guest', done: true },
    { label: 'Room & Dates', done: true },
    { label: 'Rates & Add-ons', active: true },
    { label: 'Payment' },
    { label: 'Confirm' },
  ];

  readonly ratePlans: RatePlanCard[] = [
    { name: 'Standard Rate', label: 'Best available, fully flexible', note: 'Free cancellation - 24 hours', weekday: '$189/night', weekend: '$189/night', selected: true, badge: 'Recommended' },
    { name: 'Advance Purchase', label: 'Non-refundable — save 10%', note: 'Non-refundable', weekday: '$170/night', weekend: '$170/night', badge: 'Save 10%' },
    { name: 'Gold Member Rate', label: '5% loyalty discount', note: 'Free cancellation - 48 hours', weekday: '$179/night', weekend: '$179/night', badge: 'Members' },
    { name: 'Corporate Rate', label: 'Mon–Fri business bookings', note: 'Free cancellation - 72 hours', weekday: '$165/night', weekend: 'Weekend: n/a/night', badge: 'Business' },
  ];

  readonly addOns: AddOnCard[] = [
    { name: 'Breakfast Package', description: 'Full buffet for 2 / $45 per night', price: '+$180' },
    { name: 'Valet Parking', description: 'Secure parking / $25 per night', price: '+$100', selected: true },
    { name: 'Airport Transfer', description: 'Return private transfer (flat)', price: '+$95' },
    { name: 'Spa Package', description: '60-min couples massage + access', price: '+$180' },
    { name: 'Welcome Amenity', description: 'Champagne, flowers & chocolates', price: '+$65', selected: true },
    { name: 'Late Check-out 2PM', description: 'Standard checkout is 11:00 AM', price: '+$50' },
  ];

  readonly savedCodes = ['SUMMER20', 'CORP2026'];
  readonly bookingSummary: SummaryLineItem[] = [
    { label: 'Room', value: '201 - Deluxe King' },
    { label: 'Check-in', value: 'Fri, 29 May 2026' },
    { label: 'Check-out', value: 'Tue, 02 Jun 2026' },
    { label: 'Duration', value: '4 nights' },
    { label: 'Guests', value: '2 Adults' },
    { label: 'Source', value: 'Direct / Front Desk' },
  ];
}
