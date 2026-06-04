import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CheckoutAction } from '../../models/check-out.model';

@Component({
  selector: 'app-check-out-complete-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './check-out-complete-page.component.html',
  styleUrl: './check-out-complete-page.component.css',
})
export class CheckOutCompletePageComponent {
  readonly actions: CheckoutAction[] = [
    { iconClass: 'bi-house-heart', label: 'Housekeeping notified at 11:08 AM', note: 'Room 305 flagged for priority cleaning', tone: 'info' },
    { iconClass: 'bi-star-fill', label: '717 Silver Points earned this stay', note: 'New balance: 3,407 points', tone: 'gold' },
    { iconClass: 'bi-envelope', label: 'Post-stay survey sent to maria.garcia@email.com', tone: 'success' },
  ];
}
