import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type ViewMode = '2weeks' | 'month';

interface DayColumn {
  day: string;
  date: string;
  month?: string;
  weekend?: boolean;
  today?: boolean;
}

interface StayBar {
  label: string;
  startDate: Date;
  endDate: Date;
  tone: 'occupied' | 'confirmed' | 'vip' | 'hold' | 'ooo';
}

interface RenderedBar {
  label: string;
  start: number;
  span: number;
  tone: 'occupied' | 'confirmed' | 'vip' | 'hold' | 'ooo';
}

interface RoomTimeline {
  no: string;
  type: string;
  rate: string;
  bars: StayBar[];
  alert?: boolean;
}

interface FloorGroup {
  label: string;
  rooms: RoomTimeline[];
}

@Component({
  selector: 'app-rooms-calendar-view-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms-calendar-view-page.component.html',
  styleUrl: './rooms-calendar-view-page.component.css',
})
export class RoomsCalendarViewPageComponent {
  readonly todayDate = new Date(2026, 4, 29);
  viewMode: ViewMode = '2weeks';
  visibleStart = new Date(2026, 4, 29);
  days: DayColumn[] = [];
  rangeLabel = '';

  readonly floors: FloorGroup[] = [
    {
      label: 'Floor 1 — Standard Rooms',
      rooms: [
        {
          no: '101',
          type: 'Std King',
          rate: '$149',
          bars: [
            { label: 'J. Smith', startDate: new Date(2026, 4, 29), endDate: new Date(2026, 5, 1), tone: 'occupied' },
          ],
        },
        {
          no: '102',
          type: 'Std Queen',
          rate: '$129',
          bars: [
            { label: 'D. Wilson', startDate: new Date(2026, 5, 3), endDate: new Date(2026, 5, 6), tone: 'occupied' },
          ],
        },
        {
          no: '103',
          type: 'Std King',
          rate: '$149',
          bars: [
            { label: 'T. Williams', startDate: new Date(2026, 5, 1), endDate: new Date(2026, 5, 5), tone: 'confirmed' },
          ],
        },
        {
          no: '104',
          type: 'Std Queen',
          rate: '$129',
          alert: true,
          bars: [
            { label: 'Out of Order', startDate: new Date(2026, 4, 29), endDate: new Date(2026, 5, 11), tone: 'ooo' },
          ],
        },
        {
          no: '105',
          type: 'Std King',
          rate: '$149',
          bars: [
            { label: 'D. Park', startDate: new Date(2026, 4, 30), endDate: new Date(2026, 4, 31), tone: 'occupied' },
            { label: 'M. Brown', startDate: new Date(2026, 5, 4), endDate: new Date(2026, 5, 7), tone: 'vip' },
          ],
        },
        {
          no: '106',
          type: 'Std Queen',
          rate: '$129',
          bars: [
            { label: 'R. Johnson', startDate: new Date(2026, 5, 3), endDate: new Date(2026, 5, 7), tone: 'occupied' },
          ],
        },
      ],
    },
    {
      label: 'Floor 2 — Deluxe Rooms',
      rooms: [
        {
          no: '201',
          type: 'Dlx King',
          rate: '$189',
          bars: [
            { label: 'Cleaning', startDate: new Date(2026, 4, 29), endDate: new Date(2026, 4, 30), tone: 'hold' },
            { label: 'P. Kumar', startDate: new Date(2026, 5, 1), endDate: new Date(2026, 5, 3), tone: 'occupied' },
          ],
        },
        {
          no: '202',
          type: 'Dlx Twin',
          rate: '$179',
          bars: [
            { label: 'R. Patel', startDate: new Date(2026, 4, 29), endDate: new Date(2026, 4, 31), tone: 'occupied' },
            { label: 'A. Santos', startDate: new Date(2026, 5, 3), endDate: new Date(2026, 5, 6), tone: 'confirmed' },
          ],
        },
        {
          no: '203',
          type: 'Dlx King',
          rate: '$189',
          bars: [
            { label: 'Cleaning', startDate: new Date(2026, 4, 29), endDate: new Date(2026, 4, 30), tone: 'hold' },
            { label: 'S. Martin', startDate: new Date(2026, 5, 1), endDate: new Date(2026, 5, 5), tone: 'vip' },
          ],
        },
        {
          no: '204',
          type: 'Dlx Queen',
          rate: '$179',
          bars: [
            { label: 'D. Park Jr.', startDate: new Date(2026, 5, 1), endDate: new Date(2026, 5, 5), tone: 'occupied' },
          ],
        },
        {
          no: '205',
          type: 'Dlx Twin',
          rate: '$179',
          bars: [
            { label: 'C. Lee', startDate: new Date(2026, 5, 6), endDate: new Date(2026, 5, 8), tone: 'confirmed' },
          ],
        },
      ],
    },
    {
      label: 'Floor 3 — Suites',
      rooms: [
        {
          no: '301',
          type: 'Jr Suite',
          rate: '$289',
          bars: [
            { label: 'J. Lee', startDate: new Date(2026, 5, 1), endDate: new Date(2026, 5, 5), tone: 'vip' },
          ],
        },
        {
          no: '302',
          type: 'Suite Dlx',
          rate: '$329',
          bars: [
            { label: 'J. Lee Jr.', startDate: new Date(2026, 5, 1), endDate: new Date(2026, 5, 5), tone: 'occupied' },
          ],
        },
        {
          no: '305',
          type: 'Ocean Ste',
          rate: '$349',
          bars: [
            { label: 'L. Wong ★', startDate: new Date(2026, 4, 29), endDate: new Date(2026, 5, 1), tone: 'occupied' },
            { label: 'VIP Hold', startDate: new Date(2026, 5, 8), endDate: new Date(2026, 5, 11), tone: 'hold' },
          ],
        },
      ],
    },
  ];

  constructor() {
    this.rebuildDays();
  }

  get dayCount(): number {
    return this.viewMode === '2weeks' ? 14 : 30;
  }

  get isTodayRange(): boolean {
    return this.sameDate(this.visibleStart, this.todayDate);
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

  barsFor(room: RoomTimeline): RenderedBar[] {
    const rangeEnd = this.addDays(this.visibleStart, this.dayCount - 1);

    return room.bars
      .map((bar) => {
        const clippedStart = bar.startDate > this.visibleStart ? bar.startDate : this.visibleStart;
        const clippedEnd = bar.endDate < rangeEnd ? bar.endDate : rangeEnd;

        if (this.diffDays(clippedStart, clippedEnd) < 0) {
          return null;
        }

        return {
          label: bar.label,
          start: this.diffDays(this.visibleStart, clippedStart),
          span: this.diffDays(clippedStart, clippedEnd) + 1,
          tone: bar.tone,
        };
      })
      .filter((bar): bar is RenderedBar => bar !== null);
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

  private diffDays(start: Date, end: Date): number {
    const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
    return Math.floor((e - s) / 86400000);
  }

  private sameDate(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }
}
