import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CheckInQueueRow, CheckInQueueStats } from '../../models/check-in.model';

@Component({
  selector: 'app-arrivals-queue-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './arrivals-queue-page.component.html',
  styleUrl: './arrivals-queue-page.component.css',
})
export class ArrivalsQueuePageComponent {
  readonly stats: CheckInQueueStats[] = [
    {
      title: 'Total Arrivals',
      value: '12',
      subtitle: 'Expected today',
      iconClass: 'bi-arrow-right',
      tone: 'primary',
    },
    {
      title: 'Checked In',
      value: '3',
      subtitle: 'Completed',
      iconClass: 'bi-check-lg',
      tone: 'success',
    },
    {
      title: 'Pending',
      value: '9',
      subtitle: 'Awaiting check-in',
      iconClass: 'bi-hourglass-split',
      tone: 'warning',
    },
    {
      title: 'VIP Arrivals',
      value: '2',
      subtitle: 'Priority guests',
      iconClass: 'bi-star-fill',
      tone: 'violet',
    },
    {
      title: 'Late Arrivals',
      value: '2',
      subtitle: 'After 8:00 PM',
      iconClass: 'bi-exclamation-lg',
      tone: 'danger',
    },
  ];

  readonly tabs = ['All Arrivals (12)', 'Pending (9)', 'VIP (2)', 'Walk-in (0)', 'Completed (3)'];
  readonly activeTab = 'All Arrivals (12)';

  readonly rows: CheckInQueueRow[] = [
    {
      confNo: '#RES-049',
      initials: 'JS',
      guest: 'John Smith',
      tier: 'Gold Member',
      room: '201',
      roomType: 'Deluxe King',
      eta: '2:00 PM',
      nights: 4,
      amount: '$1,012',
      ratePlan: 'Standard',
      notes: 'Late CI req.',
      status: 'VIP',
    },
    {
      confNo: '#RES-003',
      initials: 'RP',
      guest: 'Raj Patel',
      tier: 'Bronze Member',
      room: '412',
      roomType: 'Standard',
      eta: '4:00 PM',
      nights: 3,
      amount: '$390',
      ratePlan: 'Standard',
      notes: '—',
      status: 'Confirmed',
    },
    {
      confNo: '#RES-006',
      initials: 'PK',
      guest: 'Priya Kumar',
      tier: 'Gold Member',
      room: '103',
      roomType: 'Standard',
      eta: '3:00 PM',
      nights: 2,
      amount: '$260',
      ratePlan: 'Gold Rate',
      notes: 'Veg diet',
      status: 'Confirmed',
    },
    {
      confNo: '#RES-007',
      initials: 'JL',
      guest: 'James Lee',
      tier: 'Platinum',
      room: '302',
      roomType: 'Suite',
      eta: 'Anytime',
      nights: 4,
      amount: '$996',
      ratePlan: 'Standard',
      notes: 'High floor',
      status: 'VIP',
    },
    {
      confNo: '#RES-012',
      initials: 'SM',
      guest: 'Sophie Martin',
      tier: 'New Guest',
      room: '202',
      roomType: 'Deluxe',
      eta: '6:00 PM',
      nights: 4,
      amount: '$720',
      ratePlan: 'Weekend',
      notes: '—',
      status: 'Late Arrival',
    },
    {
      confNo: '#RES-013',
      initials: 'RJ',
      guest: 'Robert Johnson',
      tier: 'Silver Member',
      room: '106',
      roomType: 'Standard',
      eta: '5:00 PM',
      nights: 4,
      amount: '$520',
      ratePlan: 'Corporate',
      notes: 'Corp rate',
      status: 'Confirmed',
    },
  ];

  statusClass(status: CheckInQueueRow['status']): string {
    return status.toLowerCase().replace(' ', '-');
  }
}
