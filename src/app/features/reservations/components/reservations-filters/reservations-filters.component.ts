import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reservations-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservations-filters.component.html',
  styleUrl: './reservations-filters.component.css',
})
export class ReservationsFiltersComponent {
  @Output() applyFilters = new EventEmitter<void>();
  @Output() resetFilters = new EventEmitter<void>();
}
