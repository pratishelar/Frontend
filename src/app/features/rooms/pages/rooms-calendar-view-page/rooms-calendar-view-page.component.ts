import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Room, RoomStatus, RoomStay, StayTone } from '../../models/room.model';
import { RoomsManagementService } from '../../services/rooms-management.service';

type ViewMode = '2weeks' | 'month';

interface DayColumn {
  day: string;
  date: string;
  month?: string;
  weekend?: boolean;
  today?: boolean;
}

interface RenderedBar {
  id: string;
  label: string;
  start: number;
  span: number;
  tone: StayTone;
}

interface InteractionState {
  mode: 'move' | 'resize';
  stayId: string;
  sourceRoomNo: string;
  startClientX: number;
  originalStart: Date;
  originalEnd: Date;
}

interface FloorGroup {
  label: string;
  rooms: Room[];
}

@Component({
  selector: 'app-rooms-calendar-view-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rooms-calendar-view-page.component.html',
  styleUrl: './rooms-calendar-view-page.component.css',
})
export class RoomsCalendarViewPageComponent {
  readonly todayDate = new Date(2026, 4, 29);
  readonly statusOptions: Array<'All' | RoomStatus> = [
    'All',
    'Available',
    'Occupied',
    'Cleaning',
    'Out of Order',
  ];

  viewMode: ViewMode = '2weeks';
  visibleStart = new Date(2026, 4, 29);
  days: DayColumn[] = [];
  rangeLabel = '';
  allRooms: Room[] = [];
  filteredRooms: Room[] = [];
  allStays: RoomStay[] = [];

  floorOptions: string[] = ['All'];
  roomTypeOptions: string[] = ['All'];

  selectedFloor = 'All';
  selectedType = 'All';
  selectedStatus: 'All' | RoomStatus = 'All';
  private interaction?: InteractionState;
  private readonly previewByStayId = new Map<string, { startDate: string; endDate: string }>();
  private readonly dayPixelWidth = 68;
  private hoveredRoomNo?: string;

  constructor(private readonly roomsService: RoomsManagementService) {
    this.roomsService.stays$.subscribe((stays) => {
      this.allStays = stays;
    });

    this.roomsService.rooms$.subscribe((rooms) => {
      this.allRooms = rooms;
      this.floorOptions = ['All', ...Array.from(new Set(rooms.map((room) => room.floor)))];
      this.roomTypeOptions = ['All', ...Array.from(new Set(rooms.map((room) => room.type)))];
      this.applyFilters();
    });

    this.rebuildDays();
  }

  get dayCount(): number {
    return this.viewMode === '2weeks' ? 14 : 30;
  }

  get isTodayRange(): boolean {
    return this.sameDate(this.visibleStart, this.todayDate);
  }

  get floors(): FloorGroup[] {
    const groups = new Map<string, Room[]>();

    for (const room of this.filteredRooms) {
      const list = groups.get(room.floor) ?? [];
      list.push(room);
      groups.set(room.floor, list);
    }

    return Array.from(groups.entries())
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([floor, rooms]) => ({
        label: `Floor ${floor}`,
        rooms: rooms.sort((a, b) => Number(a.roomNo) - Number(b.roomNo)),
      }));
  }

  get availableCount(): number {
    return this.filteredRooms.filter((room) => room.status === 'Available').length;
  }

  get occupiedCount(): number {
    return this.filteredRooms.filter((room) => room.status === 'Occupied').length;
  }

  get cleaningCount(): number {
    return this.filteredRooms.filter((room) => room.status === 'Cleaning').length;
  }

  get outOfOrderCount(): number {
    return this.filteredRooms.filter((room) => room.status === 'Out of Order').length;
  }

  get occupancyPercent(): number {
    if (this.filteredRooms.length === 0) {
      return 0;
    }

    return Math.round((this.occupiedCount / this.filteredRooms.length) * 100);
  }

  get arrivalsToday(): number {
    return this.allStays.filter((stay) => {
      if (!this.hasRoom(stay.roomNo)) {
        return false;
      }

      return this.sameDate(this.parseDate(stay.startDate), this.todayDate);
    }).length;
  }

  get departuresToday(): number {
    return this.allStays.filter((stay) => {
      if (!this.hasRoom(stay.roomNo)) {
        return false;
      }

      return this.sameDate(this.parseDate(stay.endDate), this.todayDate);
    }).length;
  }

  get averageStayNights(): string {
    const filteredStays = this.allStays.filter((stay) => this.hasRoom(stay.roomNo));

    if (filteredStays.length === 0) {
      return '0.0';
    }

    const totalNights = filteredStays.reduce((sum, stay) => {
      return sum + this.diffDays(this.parseDate(stay.startDate), this.parseDate(stay.endDate)) + 1;
    }, 0);

    return (totalNights / filteredStays.length).toFixed(1);
  }

  get adr(): number {
    if (this.occupiedCount === 0) {
      return 0;
    }

    const occupiedRevenue = this.filteredRooms
      .filter((room) => room.status === 'Occupied')
      .reduce((sum, room) => sum + room.rateNight, 0);

    return Math.round(occupiedRevenue / this.occupiedCount);
  }

  get revpar(): number {
    return Math.round((this.adr * this.occupancyPercent) / 100);
  }

  applyFilters(): void {
    this.filteredRooms = this.allRooms.filter((room) => {
      const matchesFloor = this.selectedFloor === 'All' || room.floor === this.selectedFloor;
      const matchesType = this.selectedType === 'All' || room.type === this.selectedType;
      const matchesStatus = this.selectedStatus === 'All' || room.status === this.selectedStatus;

      return matchesFloor && matchesType && matchesStatus;
    });
  }

  setViewMode(mode: ViewMode): void {
    this.viewMode = mode;
    this.rebuildDays();
  }

  goToToday(): void {
    this.visibleStart = new Date(this.todayDate);
    this.rebuildDays();
  }

  shiftRange(direction: -1 | 1): void {
    this.visibleStart = this.addDays(this.visibleStart, direction * this.dayCount);
    this.rebuildDays();
  }

  onBarMouseDown(
    event: MouseEvent,
    bar: RenderedBar,
    roomNo: string,
    mode: 'move' | 'resize'
  ): void {
    event.preventDefault();
    event.stopPropagation();

    const source = this.allStays.find((stay) => stay.id === bar.id);
    if (!source) {
      return;
    }

    this.interaction = {
      mode,
      stayId: source.id,
      sourceRoomNo: roomNo,
      startClientX: event.clientX,
      originalStart: this.parseDate(source.startDate),
      originalEnd: this.parseDate(source.endDate),
    };

    this.hoveredRoomNo = roomNo;
  }

  isInteracting(stayId: string): boolean {
    return this.interaction?.stayId === stayId;
  }

  onRoomHover(roomNo: string): void {
    if (!this.interaction || this.interaction.mode !== 'move') {
      return;
    }

    this.hoveredRoomNo = roomNo;
  }

  isDropTarget(roomNo: string): boolean {
    return (
      this.interaction?.mode === 'move' &&
      this.hoveredRoomNo === roomNo &&
      this.interaction.sourceRoomNo !== roomNo
    );
  }

  @HostListener('window:mousemove', ['$event'])
  onPointerMove(event: MouseEvent): void {
    if (!this.interaction) {
      return;
    }

    const deltaDays = Math.round((event.clientX - this.interaction.startClientX) / this.dayPixelWidth);

    if (deltaDays === 0 && !this.previewByStayId.has(this.interaction.stayId)) {
      return;
    }

    let nextStart = this.interaction.originalStart;
    let nextEnd = this.interaction.originalEnd;

    if (this.interaction.mode === 'move') {
      nextStart = this.addDays(this.interaction.originalStart, deltaDays);
      nextEnd = this.addDays(this.interaction.originalEnd, deltaDays);
    } else {
      nextEnd = this.addDays(this.interaction.originalEnd, deltaDays);
      if (this.diffDays(this.interaction.originalStart, nextEnd) < 0) {
        nextEnd = this.interaction.originalStart;
      }
    }

    this.previewByStayId.set(this.interaction.stayId, {
      startDate: this.formatDate(nextStart),
      endDate: this.formatDate(nextEnd),
    });
  }

  @HostListener('window:mouseup')
  onPointerUp(): void {
    if (!this.interaction) {
      return;
    }

    const preview = this.previewByStayId.get(this.interaction.stayId);
    if (preview) {
      this.roomsService.updateStay(
        this.interaction.stayId,
        {
          startDate: preview.startDate,
          endDate: preview.endDate,
          roomNo:
            this.interaction.mode === 'move' && this.hoveredRoomNo
              ? this.hoveredRoomNo
              : undefined,
        }
      );
      this.previewByStayId.delete(this.interaction.stayId);
    }

    this.interaction = undefined;
    this.hoveredRoomNo = undefined;
  }

  barsFor(room: Room): RenderedBar[] {
    const rangeEnd = this.addDays(this.visibleStart, this.dayCount - 1);
    const roomStays = this.allStays.filter((stay) => stay.roomNo === room.roomNo);

    return roomStays
      .map((bar) => {
        const preview = this.previewByStayId.get(bar.id);
        const startDate = this.parseDate(preview?.startDate ?? bar.startDate);
        const endDate = this.parseDate(preview?.endDate ?? bar.endDate);

        const clippedStart = startDate > this.visibleStart ? startDate : this.visibleStart;
        const clippedEnd = endDate < rangeEnd ? endDate : rangeEnd;

        if (this.diffDays(clippedStart, clippedEnd) < 0) {
          return null;
        }

        return {
          id: bar.id,
          label: bar.label,
          start: this.diffDays(this.visibleStart, clippedStart),
          span: this.diffDays(clippedStart, clippedEnd) + 1,
          tone: bar.tone,
        };
      })
      .filter((bar): bar is RenderedBar => bar !== null);
  }

  formatRate(value: number): string {
    return `$${Math.round(value)}`;
  }

  private rebuildDays(): void {
    this.days = Array.from({ length: this.dayCount }, (_, idx) => {
      const date = this.addDays(this.visibleStart, idx);
      return {
        day: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
        date: String(date.getDate()),
        month: idx === 0 || date.getDate() === 1 ? new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date) : undefined,
        weekend: date.getDay() === 0 || date.getDay() === 6,
        today: this.sameDate(date, this.todayDate),
      };
    });

    const rangeEnd = this.addDays(this.visibleStart, this.dayCount - 1);
    const from = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short' }).format(this.visibleStart);
    const to = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).format(rangeEnd);
    this.rangeLabel = `${from} - ${to}`;
  }

  private addDays(date: Date, days: number): Date {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  }

  private parseDate(value: string): Date {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  private formatDate(value: Date): string {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private hasRoom(roomNo: string): boolean {
    return this.filteredRooms.some((room) => room.roomNo === roomNo);
  }

  private diffDays(start: Date, end: Date): number {
    const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
    return Math.floor((e - s) / 86400000);
  }

  private sameDate(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }
}
