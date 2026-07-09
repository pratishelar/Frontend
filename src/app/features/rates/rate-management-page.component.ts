import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TablePaginationComponent } from '../../shared/ui/table-pagination/table-pagination.component';
import { PromoCode, RatePlan, RatePlanStatus } from './models/rate.model';
import { RateManagementService } from './services/rate-management.service';

interface RateMetric {
  label: string;
  value: string;
  helper: string;
  icon: string;
  tone: 'blue' | 'green' | 'amber' | 'violet';
}

interface RateTab {
  label: 'All' | RatePlanStatus;
  count: number;
}

@Component({
  selector: 'app-rate-management-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TablePaginationComponent],
  templateUrl: './rate-management-page.component.html',
  styleUrl: './rate-management-page.component.css',
})
export class RateManagementPageComponent {
  readonly allRatePlans: RatePlan[];
  readonly roomTypeOptions: string[];
  readonly channelOptions: string[];
  readonly statusOptions: Array<'All' | RatePlanStatus>;

  searchTerm = '';
  selectedRoomType = 'All';
  selectedChannel = 'All';
  selectedStatus: 'All' | RatePlanStatus = 'All';

  metrics: RateMetric[] = [];
  rateTabs: RateTab[] = [];
  filteredRatePlans: RatePlan[] = [];

  readonly pageSizes = ['10', '25', '50'];
  selectedPageSize = '10';
  currentPage = 1;

  constructor(private readonly rateService: RateManagementService) {
    this.allRatePlans = this.rateService.getRatePlans();
    this.roomTypeOptions = this.rateService.getRoomTypes();
    this.channelOptions = this.rateService.getChannels();
    this.statusOptions = this.rateService.getStatuses();

    this.rebuildSummary();
    this.applyFilters();
  }

  onStatusTabChange(status: 'All' | RatePlanStatus): void {
    this.selectedStatus = status;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredRatePlans = this.rateService.filterRatePlans({
      query: this.searchTerm,
      roomType: this.selectedRoomType,
      channel: this.selectedChannel,
      status: this.selectedStatus === 'All' ? undefined : this.selectedStatus,
    });

    this.currentPage = 1;
  }

  get plansSummary(): string {
    if (this.filteredRatePlans.length === 0) {
      return `Showing 0 of ${this.allRatePlans.length} plans`;
    }

    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(start + this.pageSize - 1, this.filteredRatePlans.length);
    return `Showing ${start}-${end} of ${this.filteredRatePlans.length} plans`;
  }

  get pagedRatePlans(): RatePlan[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredRatePlans.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredRatePlans.length / this.pageSize));
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

  private get pageSize(): number {
    return Number(this.selectedPageSize);
  }

  private rebuildSummary(): void {
    const statusCounts = this.rateService.getRateStatusCounts();
    const livePromos = this.rateService
      .getPromoCodes()
      .filter((promo) => promo.status === 'Live').length;

    this.metrics = [
      {
        label: 'Total Rate Plans',
        value: String(statusCounts.All),
        helper: 'Across all room types',
        icon: 'bi-diagram-3',
        tone: 'blue',
      },
      {
        label: 'Active Plans',
        value: String(statusCounts.Active),
        helper: 'Live and sellable',
        icon: 'bi-check2-circle',
        tone: 'green',
      },
      {
        label: 'Scheduled',
        value: String(statusCounts.Scheduled),
        helper: 'Future launch',
        icon: 'bi-clock-history',
        tone: 'amber',
      },
      {
        label: 'Promo Codes Live',
        value: String(livePromos),
        helper: 'Valid on website',
        icon: 'bi-ticket-perforated',
        tone: 'violet',
      },
    ];

    this.rateTabs = [
      { label: 'All', count: statusCounts.All },
      { label: 'Active', count: statusCounts.Active },
      { label: 'Paused', count: statusCounts.Paused },
      { label: 'Scheduled', count: statusCounts.Scheduled },
      { label: 'Expired', count: statusCounts.Expired },
    ];
  }
}