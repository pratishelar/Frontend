import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TablePaginationComponent } from '../../shared/ui/table-pagination/table-pagination.component';
import { Room, RoomStatus } from './models/room.model';
import { RoomsManagementService } from './services/rooms-management.service';

interface RoomMetric {
  label: string;
  value: string;
  helper: string;
  icon: string;
  tone: 'blue' | 'green' | 'amber' | 'violet' | 'red';
}

interface RoomTab {
  label: 'All Rooms' | RoomStatus;
  count: number;
}

type SortKey = 'roomNo' | 'type' | 'floor' | 'rateNight' | 'status';

@Component({
  selector: 'app-rooms-management-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TablePaginationComponent],
  templateUrl: './rooms-management-page.component.html',
  styleUrl: './rooms-management-page.component.css',
})
export class RoomsManagementPageComponent {
  readonly statusOptions: Array<'All' | RoomStatus> = [
    'All',
    'Available',
    'Occupied',
    'Cleaning',
    'Out of Order',
  ];

  readonly housekeepingOptions = ['All', 'Clean', 'Dirty', 'In Progress', 'Maintenance', 'DND'];

  allRooms: Room[] = [];
  filteredRooms: Room[] = [];

  floorOptions: string[] = ['All'];
  roomTypeOptions: string[] = ['All'];

  searchTerm = '';
  selectedFloor = 'All';
  selectedRoomType = 'All';
  selectedStatus: 'All' | RoomStatus = 'All';
  selectedHousekeeping = 'All';
  selectedTab: 'All Rooms' | RoomStatus = 'All Rooms';
  sortKey: SortKey = 'roomNo';
  sortAsc = true;
  readonly pageSizes = ['10', '25', '50'];
  selectedPageSize = '10';
  currentPage = 1;

  constructor(private readonly roomsService: RoomsManagementService) {
    this.roomsService.rooms$.subscribe((rooms) => {
      this.allRooms = rooms;
      this.floorOptions = ['All', ...Array.from(new Set(rooms.map((room) => room.floor)))];
      this.roomTypeOptions = ['All', ...Array.from(new Set(rooms.map((room) => room.type)))];
      this.applyFilters();
    });
  }

  get metrics(): RoomMetric[] {
    const availableCount = this.countByStatus('Available');
    const occupiedCount = this.countByStatus('Occupied');
    const cleaningCount = this.countByStatus('Cleaning');
    const outOfOrderCount = this.countByStatus('Out of Order');

    return [
      {
        label: 'Total Rooms',
        value: String(this.allRooms.length),
        helper: 'All floors',
        icon: 'bi-door-open',
        tone: 'blue',
      },
      {
        label: 'Available',
        value: String(availableCount),
        helper: 'Ready for check-in',
        icon: 'bi-check-lg',
        tone: 'green',
      },
      {
        label: 'Occupied',
        value: String(occupiedCount),
        helper: 'Currently in use',
        icon: 'bi-person-fill',
        tone: 'amber',
      },
      {
        label: 'Cleaning',
        value: String(cleaningCount),
        helper: 'Housekeeping active',
        icon: 'bi-brush-fill',
        tone: 'violet',
      },
      {
        label: 'Out of Order',
        value: String(outOfOrderCount),
        helper: 'Maintenance hold',
        icon: 'bi-exclamation-triangle-fill',
        tone: 'red',
      },
    ];
  }

  get roomTabs(): RoomTab[] {
    return [
      { label: 'All Rooms', count: this.allRooms.length },
      { label: 'Available', count: this.countByStatus('Available') },
      { label: 'Occupied', count: this.countByStatus('Occupied') },
      { label: 'Cleaning', count: this.countByStatus('Cleaning') },
      { label: 'Out of Order', count: this.countByStatus('Out of Order') },
    ];
  }

  get roomsSummary(): string {
    if (this.filteredRooms.length === 0) {
      return `Showing 0 of ${this.allRooms.length} rooms`;
    }

    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(start + this.pageSize - 1, this.filteredRooms.length);
    return `Showing ${start}-${end} of ${this.filteredRooms.length} filtered rooms (${this.allRooms.length} total)`;
  }

  get pagedRooms(): Room[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredRooms.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredRooms.length / this.pageSize));
  }

  onTabChange(tab: 'All Rooms' | RoomStatus): void {
    this.selectedTab = tab;
    this.selectedStatus = tab === 'All Rooms' ? 'All' : tab;
    this.applyFilters();
  }

  toggleSort(key: SortKey): void {
    if (this.sortKey === key) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = key;
      this.sortAsc = true;
    }

    this.applyFilters();
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

  isSortActive(key: SortKey): boolean {
    return this.sortKey === key;
  }

  applyFilters(): void {
    const query = this.searchTerm.trim().toLowerCase();

    this.filteredRooms = this.allRooms.filter((room) => {
      const matchesQuery =
        query.length === 0 ||
        room.roomNo.toLowerCase().includes(query) ||
        room.type.toLowerCase().includes(query) ||
        room.currentGuest.toLowerCase().includes(query);

      const matchesFloor = this.selectedFloor === 'All' || room.floor === this.selectedFloor;
      const matchesType = this.selectedRoomType === 'All' || room.type === this.selectedRoomType;
      const matchesStatus = this.selectedStatus === 'All' || room.status === this.selectedStatus;
      const matchesHousekeeping =
        this.selectedHousekeeping === 'All' ||
        room.housekeeping === this.selectedHousekeeping;

      return matchesQuery && matchesFloor && matchesType && matchesStatus && matchesHousekeeping;
    });

    this.filteredRooms = [...this.filteredRooms].sort((a, b) => {
      const direction = this.sortAsc ? 1 : -1;

      switch (this.sortKey) {
        case 'roomNo':
          return direction * (Number(a.roomNo) - Number(b.roomNo));
        case 'floor':
          return direction * (Number(a.floor) - Number(b.floor));
        case 'rateNight':
          return direction * (a.rateNight - b.rateNight);
        case 'type':
          return direction * a.type.localeCompare(b.type);
        case 'status':
          return direction * a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    const maxPage = Math.max(1, Math.ceil(this.filteredRooms.length / this.pageSize));
    this.currentPage = Math.min(this.currentPage, maxPage);
    if (this.filteredRooms.length === 0) {
      this.currentPage = 1;
    }
  }

  private get pageSize(): number {
    return Number(this.selectedPageSize);
  }

  private countByStatus(status: RoomStatus): number {
    return this.allRooms.filter((room) => room.status === status).length;
  }
}
