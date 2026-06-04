import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-check-in-complete-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './check-in-complete-page.component.html',
  styleUrl: './check-in-complete-page.component.css',
})
export class CheckInCompletePageComponent {
  readonly actions = [
    {
      iconClass: 'bi-star-fill',
      label: '1,013 Gold points earned this stay',
      sublabel: 'New balance: 2,213 points · Gold tier maintained',
      tone: 'gold',
    },
    {
      iconClass: 'bi-printer',
      label: 'Print Key Card Envelope',
      tone: 'neutral',
    },
    {
      iconClass: 'bi-envelope',
      label: 'Email Welcome Letter to Guest',
      tone: 'neutral',
    },
    {
      iconClass: 'bi-phone',
      label: 'Send Mobile Key (Digital)',
      tone: 'info',
    },
    {
      iconClass: 'bi-bell',
      label: 'Notify Housekeeping of Arrival',
      tone: 'success',
    },
    {
      iconClass: 'bi-magic',
      label: 'Order Welcome Amenity',
      tone: 'violet',
    },
    {
      iconClass: 'bi-clipboard',
      label: 'Open Reservation Record',
      tone: 'neutral',
    },
  ];
}
