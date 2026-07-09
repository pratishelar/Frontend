import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RatePlan } from '../../models/rate.model';
import { RateManagementService } from '../../services/rate-management.service';

@Component({
  selector: 'app-view-rate-plan-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-rate-plan-page.component.html',
  styleUrl: './view-rate-plan-page.component.css',
})
export class ViewRatePlanPageComponent {
  readonly plan: RatePlan | undefined;

  constructor(
    route: ActivatedRoute,
    private readonly rateService: RateManagementService
  ) {
    const code = route.snapshot.paramMap.get('code') ?? '';
    this.plan = this.rateService.getRatePlanByCode(code);
  }
}
