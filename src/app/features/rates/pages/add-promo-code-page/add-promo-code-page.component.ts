import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-promo-code-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './add-promo-code-page.component.html',
  styleUrl: './add-promo-code-page.component.css',
})
export class AddPromoCodePageComponent {
  readonly discountTypes = ['Percentage', 'Fixed Amount'];
  readonly applicableRatePlans = ['All Active Plans', 'BAR-K', 'ADV14', 'WKND-S', 'CORP-A'];
}