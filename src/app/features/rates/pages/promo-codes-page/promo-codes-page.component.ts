import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TablePaginationComponent } from '../../../../shared/ui/table-pagination/table-pagination.component';
import { PromoCode } from '../../models/rate.model';
import { RateManagementService } from '../../services/rate-management.service';

type PromoStatus = PromoCode['status'];
type PromoTabLabel = 'All' | PromoStatus;

interface PromoMetric {
  label: string;
  value: string;
  helper: string;
  icon: string;
  tone: 'blue' | 'green' | 'amber' | 'violet';
}

interface PromoTab {
  label: PromoTabLabel;
  count: number;
}

@Component({
  selector: 'app-promo-codes-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TablePaginationComponent],
  templateUrl: './promo-codes-page.component.html',
  styleUrl: './promo-codes-page.component.css',
})
export class PromoCodesPageComponent {
  readonly allPromoCodes: PromoCode[];
  readonly allRatePlans: string[];
  readonly statusOptions: PromoTabLabel[] = ['All', 'Live', 'Draft', 'Expired'];

  searchTerm = '';
  selectedRatePlan = 'All';
  selectedStatus: PromoTabLabel = 'All';

  metrics: PromoMetric[] = [];
  promoTabs: PromoTab[] = [];
  filteredPromoCodes: PromoCode[] = [];

  readonly pageSizes = ['10', '25', '50'];
  selectedPageSize = '10';
  currentPage = 1;

  constructor(private readonly rateService: RateManagementService) {
    this.allPromoCodes = this.rateService.getPromoCodes();

    const planSet = new Set(this.allPromoCodes.map((promo) => promo.applicableRatePlan));
    this.allRatePlans = ['All', ...Array.from(planSet)];

    this.rebuildSummary();
    this.applyFilters();
  }

  onStatusTabChange(status: PromoTabLabel): void {
    this.selectedStatus = status;
    this.applyFilters();
  }

  applyFilters(): void {
    const query = this.searchTerm.trim().toLowerCase();

    this.filteredPromoCodes = this.allPromoCodes.filter((promo) => {
      const matchesQuery =
        query.length === 0 ||
        promo.code.toLowerCase().includes(query) ||
        promo.discount.toLowerCase().includes(query);

      const matchesPlan =
        this.selectedRatePlan === 'All' ||
        promo.applicableRatePlan === this.selectedRatePlan;

      const matchesStatus =
        this.selectedStatus === 'All' || promo.status === this.selectedStatus;

      return matchesQuery && matchesPlan && matchesStatus;
    });

    this.currentPage = 1;
  }

  get promoSummary(): string {
    if (this.filteredPromoCodes.length === 0) {
      return `Showing 0 of ${this.allPromoCodes.length} promo codes`;
    }

    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(start + this.pageSize - 1, this.filteredPromoCodes.length);
    return `Showing ${start}-${end} of ${this.filteredPromoCodes.length} promo codes`;
  }

  get pagedPromoCodes(): PromoCode[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredPromoCodes.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredPromoCodes.length / this.pageSize));
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
    const liveCount = this.allPromoCodes.filter((promo) => promo.status === 'Live').length;
    const draftCount = this.allPromoCodes.filter((promo) => promo.status === 'Draft').length;
    const expiredCount = this.allPromoCodes.filter((promo) => promo.status === 'Expired').length;
    const directOnlyCount = this.allPromoCodes.filter((promo) => promo.directOnly).length;

    this.metrics = [
      {
        label: 'Total Promo Codes',
        value: String(this.allPromoCodes.length),
        helper: 'Across all plans',
        icon: 'bi-ticket-perforated',
        tone: 'blue',
      },
      {
        label: 'Live',
        value: String(liveCount),
        helper: 'Currently redeemable',
        icon: 'bi-check2-circle',
        tone: 'green',
      },
      {
        label: 'Draft',
        value: String(draftCount),
        helper: 'Pending launch',
        icon: 'bi-pencil-square',
        tone: 'amber',
      },
      {
        label: 'Direct Booking Only',
        value: String(directOnlyCount),
        helper: 'Website/direct channels',
        icon: 'bi-shop',
        tone: 'violet',
      },
    ];

    this.promoTabs = [
      { label: 'All', count: this.allPromoCodes.length },
      { label: 'Live', count: liveCount },
      { label: 'Draft', count: draftCount },
      { label: 'Expired', count: expiredCount },
    ];
  }
}