import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TablePaginationComponent } from '../../../../shared/ui/table-pagination/table-pagination.component';
import { CheckOutQueueRow, CheckOutStat } from '../../models/check-out.model';

@Component({
  selector: 'app-departures-queue-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TablePaginationComponent],
  templateUrl: './departures-queue-page.component.html',
  styleUrl: './departures-queue-page.component.css',
})
export class DeparturesQueuePageComponent {
  readonly stats: CheckOutStat[] = [
    {
      title: 'Total Departures',
      value: '8',
      subtitle: 'Expected today',
      iconClass: 'bi-arrow-left',
      tone: 'amber',
    },
    {
      title: 'Checked Out',
      value: '2',
      subtitle: 'Completed',
      iconClass: 'bi-check-lg',
      tone: 'green',
    },
    {
      title: 'Pending',
      value: '6',
      subtitle: 'Still in room',
      iconClass: 'bi-hourglass-split',
      tone: 'yellow',
    },
    {
      title: 'Overdue',
      value: '1',
      subtitle: 'Past 11:00 AM',
      iconClass: 'bi-exclamation-lg',
      tone: 'red',
    },
    {
      title: 'Late Check-out',
      value: '1',
      subtitle: 'Extended 2PM',
      iconClass: 'bi-star-fill',
      tone: 'violet',
    },
  ];

  readonly tabs = ['All (8)', 'Pending (6)', 'Overdue (1)', 'Late CO (1)', 'Done (2)'];
  readonly activeTab = 'All (8)';

  readonly rows: CheckOutQueueRow[] = [
    {
      confNo: '#RES-002',
      initials: 'MG',
      guest: 'Maria Garcia',
      tier: 'Silver Member',
      room: '305',
      roomType: 'Suite',
      dueBy: '11:00 AM',
      nights: 1,
      balanceDue: '$717.18',
      folio: 'Ready',
      notes: 'Overdue 8 min',
      status: 'Overdue',
    },
    {
      confNo: '#RES-004',
      initials: 'LW',
      guest: 'Lisa Wong',
      tier: 'Walk-in',
      room: '118',
      roomType: 'Standard',
      dueBy: '11:00 AM',
      nights: 1,
      balanceDue: '$150.00',
      folio: 'Ready',
      notes: 'Cash only',
      status: 'Pending',
    },
    {
      confNo: '#RES-009',
      initials: 'TK',
      guest: 'Tom Kim',
      tier: 'Silver Member',
      room: '204',
      roomType: 'Deluxe',
      dueBy: '2:00 PM',
      nights: 3,
      balanceDue: '$530.00',
      folio: 'Charges added',
      notes: 'Late CO + $50',
      status: 'Late CO',
    },
    {
      confNo: '#RES-010',
      initials: 'AC',
      guest: 'Alice Chen',
      tier: 'Platinum',
      room: '301',
      roomType: 'Suite',
      dueBy: '11:00 AM',
      nights: 4,
      balanceDue: '$1,100.00',
      folio: 'Review needed',
      notes: 'Corp invoice',
      status: 'Pending',
    },
    {
      confNo: '#RES-005',
      initials: 'CR',
      guest: 'Carlos Ruiz',
      tier: 'New Guest',
      room: '220',
      roomType: 'Deluxe',
      dueBy: '11:00 AM',
      nights: 4,
      balanceDue: 'Refund $64',
      folio: 'Cancelled',
      notes: 'Refund pending',
      status: 'Cancelled',
    },
    {
      confNo: '#RES-011',
      initials: 'DP',
      guest: 'David Park',
      tier: 'New Guest',
      room: '105',
      roomType: 'Standard',
      dueBy: '11:00 AM',
      nights: 2,
      balanceDue: '$260.00',
      folio: 'Ready',
      notes: '—',
      status: 'Pending',
    },
  ];

  readonly pageSizes = ['10', '25', '50'];
  selectedPageSize = '10';
  currentPage = 1;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.rows.length / this.pageSize));
  }

  get pagedRows(): CheckOutQueueRow[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.rows.slice(start, start + this.pageSize);
  }

  get summary(): string {
    if (this.rows.length === 0) {
      return 'Showing 0 departures';
    }

    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(start + this.pageSize - 1, this.rows.length);
    return `Showing ${start}-${end} of ${this.rows.length} departures`;
  }

  onPageSizeChange(size: string): void {
    this.selectedPageSize = size;
    this.currentPage = 1;
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
    }
  }

  statusClass(status: CheckOutQueueRow['status']): string {
    return status.toLowerCase().replace(' ', '-');
  }

  private get pageSize(): number {
    return Number(this.selectedPageSize);
  }
}
