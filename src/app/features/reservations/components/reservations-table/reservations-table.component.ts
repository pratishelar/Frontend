import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation, ReservationStatus } from '../../models/reservation.model';
import { TablePaginationComponent } from '../../../../shared/ui/table-pagination/table-pagination.component';

export interface RowAction {
  label: string;
  icon: string;
  route?: string;
  tone: 'green' | 'amber' | 'red' | 'blue' | 'violet' | 'neutral';
}

@Component({
  selector: 'app-reservations-table',
  standalone: true,
  imports: [CommonModule, TablePaginationComponent],
  templateUrl: './reservations-table.component.html',
  styleUrl: './reservations-table.component.css',
})
export class ReservationsTableComponent {
  @Input({ required: true }) reservations: Reservation[] = [];
  @Input({ required: true }) pageSizes: string[] = [];
  @Input({ required: true }) selectedPageSize = '10';
  @Input({ required: true }) summary = '';
  @Input({ required: true }) currentPage = 1;
  @Input({ required: true }) totalPages = 1;

  @Output() pageSizeChange = new EventEmitter<string>();
  @Output() previousPage = new EventEmitter<void>();
  @Output() nextPage = new EventEmitter<void>();

  openMenuConf: string | null = null;

  constructor(private readonly router: Router) {}

  toggleMenu(confNo: string, event: Event): void {
    event.stopPropagation();
    this.openMenuConf = this.openMenuConf === confNo ? null : confNo;
  }

  @HostListener('document:click')
  closeAllMenus(): void {
    this.openMenuConf = null;
  }

  actionsFor(status: ReservationStatus): RowAction[] {
    switch (status) {
      case 'Confirmed':
        return [
          { label: 'Check In', icon: 'bi-box-arrow-in-right', route: '/check-in/verify-assign', tone: 'green' },
          { label: 'Edit', icon: 'bi-pencil', route: '/reservations/step-1-guest', tone: 'neutral' },
          { label: 'Cancel', icon: 'bi-x-circle', tone: 'red' },
        ];
      case 'Pending':
        return [
          { label: 'Confirm', icon: 'bi-check-circle', tone: 'green' },
          { label: 'Edit', icon: 'bi-pencil', route: '/reservations/step-1-guest', tone: 'neutral' },
          { label: 'Cancel', icon: 'bi-x-circle', tone: 'red' },
        ];
      case 'Checked In':
        return [
          { label: 'Check Out', icon: 'bi-box-arrow-right', route: '/check-out/folio-review', tone: 'amber' },
          { label: 'Modify Stay', icon: 'bi-calendar-range', route: '/reservations/step-2-room-dates', tone: 'neutral' },
          { label: 'View Folio', icon: 'bi-receipt', route: '/check-out/folio-review', tone: 'blue' },
        ];
      case 'In Progress':
        return [
          { label: 'Check Out', icon: 'bi-box-arrow-right', route: '/check-out/folio-review', tone: 'amber' },
          { label: 'View Folio', icon: 'bi-receipt', route: '/check-out/folio-review', tone: 'blue' },
        ];
      case 'Checkout Due':
        return [
          { label: 'Check Out', icon: 'bi-box-arrow-right', route: '/check-out/folio-review', tone: 'red' },
          { label: 'View Folio', icon: 'bi-receipt', route: '/check-out/folio-review', tone: 'blue' },
        ];
      case 'Checked Out':
        return [
          { label: 'View Folio', icon: 'bi-receipt', route: '/check-out/folio-review', tone: 'blue' },
          { label: 'Refund', icon: 'bi-arrow-counterclockwise', tone: 'violet' },
        ];
      case 'Cancelled':
        return [
          { label: 'Rebook', icon: 'bi-arrow-repeat', route: '/reservations/step-1-guest', tone: 'green' },
        ];
      case 'No-show':
        return [
          { label: 'Rebook', icon: 'bi-arrow-repeat', route: '/reservations/step-1-guest', tone: 'green' },
          { label: 'Edit', icon: 'bi-pencil', route: '/reservations/step-1-guest', tone: 'neutral' },
        ];
      default:
        return [];
    }
  }

  navigate(route?: string): void {
    if (route) {
      this.router.navigate([route]);
    }
    this.openMenuConf = null;
  }
}
