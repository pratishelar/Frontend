import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CheckoutAction, FolioLineItem } from '../../models/check-out.model';

@Component({
  selector: 'app-folio-review-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './folio-review-page.component.html',
  styleUrl: './folio-review-page.component.css',
})
export class FolioReviewPageComponent {
  readonly lineItems: FolioLineItem[] = [
    { category: 'Room Charges', description: 'Suite 305 - Standard Rate', amount: '$220.00' },
    { category: 'Restaurant', description: '29 May - Breakfast x2', amount: '$48.00' },
    { category: 'Restaurant', description: '28 May - Dinner (room service)', amount: '$67.50' },
    { category: 'Mini Bar', description: '28 May - Mini bar items', amount: '$24.00', badge: '3 Duplicate' },
    { category: 'Spa', description: '28 May - Couples massage 60 min', amount: '$180.00' },
    { category: 'Parking', description: '1 night valet parking', amount: '$25.00' },
    { category: 'Telephone', description: 'International calls (3 min)', amount: '$12.40' },
  ];

  readonly payments: CheckoutAction[] = [
    { iconClass: 'bi-credit-card-2-front', label: 'Visa •• 4892 (on file)', tone: 'gold' },
    { iconClass: 'bi-plus-circle', label: 'New Credit / Debit Card', tone: 'neutral' },
    { iconClass: 'bi-cash', label: 'Cash', tone: 'neutral' },
    { iconClass: 'bi-receipt', label: 'Direct Bill / Invoice', tone: 'neutral' },
  ];

  readonly receiptOptions: CheckoutAction[] = [
    { iconClass: 'bi-envelope', label: 'Email receipt', tone: 'neutral' },
    { iconClass: 'bi-printer', label: 'Print receipt', tone: 'neutral' },
  ];

  readonly utilities: CheckoutAction[] = [
    { iconClass: 'bi-phone', label: 'Send post-stay survey to guest', tone: 'success' },
  ];
}
