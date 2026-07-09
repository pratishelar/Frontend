import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TablePaginationComponent } from '../../shared/ui/table-pagination/table-pagination.component';
import { GuestProfile, GuestStatus, GuestTier } from './models/guest.model';
import { GuestProfilesService } from './services/guest-profiles.service';

interface GuestMetric {
  label: string;
  value: string;
  helper: string;
  icon: string;
  tone: 'blue' | 'green' | 'amber' | 'violet';
}

interface TierChip {
  label: string;
  tone: 'platinum' | 'gold' | 'silver' | 'bronze' | 'none';
}

@Component({
  selector: 'app-guest-profiles-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TablePaginationComponent],
  templateUrl: './guest-profiles-page.component.html',
  styleUrl: './guest-profiles-page.component.css',
})
export class GuestProfilesPageComponent {
  allGuests: GuestProfile[] = [];
  filteredGuests: GuestProfile[] = [];

  readonly pageSizes = ['10', '25', '50'];
  selectedPageSize = '10';
  currentPage = 1;

  searchTerm = '';
  selectedTier: 'All' | GuestTier = 'All';
  selectedStatus: 'All' | GuestStatus = 'All';
  selectedSort = 'Last Stay';

  readonly tierOptions: Array<'All' | GuestTier> = ['All', 'New', 'Silver', 'Gold', 'Platinum'];
  readonly statusOptions: Array<'All' | GuestStatus> = ['All', 'Active', 'VIP', 'Blacklisted'];
  readonly sortOptions = ['Last Stay', 'Lifetime Value', 'Total Stays'];
  readonly quickTierChips: TierChip[] = [
    { label: 'Platinum', tone: 'platinum' },
    { label: 'Gold', tone: 'gold' },
    { label: 'Silver', tone: 'silver' },
    { label: 'Bronze', tone: 'bronze' },
    { label: 'None', tone: 'none' },
  ];

  constructor(private readonly guestService: GuestProfilesService) {
    this.guestService.guests$.subscribe((guests) => {
      this.allGuests = guests;
      this.applyFilters();
    });
  }

  get metrics(): GuestMetric[] {
    const activeCount = this.allGuests.filter((guest) => guest.status === 'Active').length;
    const vipCount = this.allGuests.filter((guest) => guest.status === 'VIP').length;
    const topTierCount = this.allGuests.filter(
      (guest) => guest.tier === 'Gold' || guest.tier === 'Platinum'
    ).length;

    return [
      {
        label: 'Total Guests',
        value: String(this.allGuests.length),
        helper: 'Profile records',
        icon: 'bi-people-fill',
        tone: 'blue',
      },
      {
        label: 'Active',
        value: String(activeCount),
        helper: 'Can be checked-in',
        icon: 'bi-check2-circle',
        tone: 'green',
      },
      {
        label: 'VIP Guests',
        value: String(vipCount),
        helper: 'Priority handling',
        icon: 'bi-star-fill',
        tone: 'amber',
      },
      {
        label: 'Gold + Platinum',
        value: String(topTierCount),
        helper: 'Loyalty top-tier',
        icon: 'bi-award-fill',
        tone: 'violet',
      },
    ];
  }

  get pagedGuests(): GuestProfile[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredGuests.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredGuests.length / this.pageSize));
  }

  get summary(): string {
    if (this.filteredGuests.length === 0) {
      return `Showing 0 of ${this.allGuests.length} guests`;
    }

    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(start + this.pageSize - 1, this.filteredGuests.length);
    return `Showing ${start}-${end} of ${this.filteredGuests.length} guests`;
  }

  applyFilters(): void {
    const query = this.searchTerm.trim().toLowerCase();

    let results = this.allGuests.filter((guest) => {
      const matchesQuery =
        query.length === 0 ||
        guest.id.toLowerCase().includes(query) ||
        guest.fullName.toLowerCase().includes(query) ||
        guest.email.toLowerCase().includes(query);

      const matchesTier = this.selectedTier === 'All' || guest.tier === this.selectedTier;
      const matchesStatus =
        this.selectedStatus === 'All' || guest.status === this.selectedStatus;

      return matchesQuery && matchesTier && matchesStatus;
    });

    if (this.selectedSort === 'Lifetime Value') {
      results = [...results].sort((a, b) => b.lifetimeValue - a.lifetimeValue);
    } else if (this.selectedSort === 'Total Stays') {
      results = [...results].sort((a, b) => b.totalStays - a.totalStays);
    } else {
      results = [...results].sort((a, b) => {
        const aDate = this.parseDateOrMin(a.lastStay);
        const bDate = this.parseDateOrMin(b.lastStay);
        return bDate.getTime() - aDate.getTime();
      });
    }

    this.filteredGuests = results;

    this.currentPage = 1;
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

  statusClass(status: GuestStatus): string {
    return status.toLowerCase();
  }

  tierClass(tier: GuestTier): string {
    return tier.toLowerCase();
  }

  countryLabel(country: string): string {
    return `${this.countryFlag(country)} ${country}`;
  }

  initials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  private countryFlag(country: string): string {
    switch (country.toLowerCase()) {
      case 'canada':
        return '🇨🇦';
      case 'spain':
        return '🇪🇸';
      case 'india':
        return '🇮🇳';
      case 'china':
        return '🇨🇳';
      case 'mexico':
        return '🇲🇽';
      case 'brazil':
        return '🇧🇷';
      case 'south korea':
      case 'korea':
        return '🇰🇷';
      case 'hong kong':
      case 'hk':
        return '🇭🇰';
      case 'usa':
      case 'united states':
        return '🇺🇸';
      default:
        return '🌐';
    }
  }

  private parseDateOrMin(value: string): Date {
    const parsed = Date.parse(value);
    if (Number.isNaN(parsed)) {
      return new Date(0);
    }

    return new Date(parsed);
  }

  private get pageSize(): number {
    return Number(this.selectedPageSize);
  }
}
