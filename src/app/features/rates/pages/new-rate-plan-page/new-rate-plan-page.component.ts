import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-rate-plan-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './new-rate-plan-page.component.html',
  styleUrl: './new-rate-plan-page.component.css',
})
export class NewRatePlanPageComponent {
  readonly roomTypes = ['All Room Types', 'Standard King', 'Standard Queen', 'Deluxe King', 'Junior Suite'];
  readonly boardTypes = ['Room Only', 'Breakfast', 'Half Board', 'Breakfast + Late Check-out'];
  readonly pricingModels = ['Flat', 'BAR +/-', 'Occupancy Based'];
  readonly channels = ['Website', 'OTA', 'Walk-in', 'GDS', 'Corporate'];
}