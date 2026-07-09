import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PromoCode } from '../../models/rate.model';
import { RateManagementService } from '../../services/rate-management.service';

@Component({
  selector: 'app-view-promo-code-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-promo-code-page.component.html',
  styleUrl: './view-promo-code-page.component.css',
})
export class ViewPromoCodePageComponent {
  readonly promo: PromoCode | undefined;

  constructor(
    route: ActivatedRoute,
    private readonly rateService: RateManagementService
  ) {
    const code = route.snapshot.paramMap.get('code') ?? '';
    this.promo = this.rateService.getPromoCodeByCode(code);
  }
}
