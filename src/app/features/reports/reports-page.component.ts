import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReportsService } from './services/reports.service';

interface ReportMetric {
  label: string;
  value: string;
  helper: string;
  icon: string;
  tone: 'blue' | 'green' | 'amber' | 'violet' | 'red';
}

interface BookingSourceItem {
  label: string;
  value: number;
  color: string;
}

interface TopRoomItem {
  room: string;
  type: string;
  nights: number;
  revenue: string;
  adr: string;
  occupancy: number;
}

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reports-page.component.html',
  styleUrl: './reports-page.component.css',
})
export class ReportsPageComponent {
  readonly periodTabs = ['Today', 'This Week', 'This Month', 'Last Month', 'Custom Range'];
  selectedPeriod = 'This Month';

  readonly weeklyRevenue = [9200, 10100, 12000, 11500];

  readonly bookingSources: BookingSourceItem[] = [
    { label: 'Direct / Front Desk', value: 72, color: '#3b82f6' },
    { label: 'Booking.com', value: 48, color: '#22c55e' },
    { label: 'Expedia', value: 32, color: '#f59e0b' },
    { label: 'Airbnb', value: 20, color: '#8b5cf6' },
    { label: 'Phone / Email', value: 12, color: '#64748b' },
  ];

  readonly topRooms: TopRoomItem[] = [
    { room: '305', type: 'Suite Ocean', nights: 26, revenue: '$9,074', adr: '$349', occupancy: 87 },
    { room: '301', type: 'Junior Suite', nights: 24, revenue: '$6,936', adr: '$289', occupancy: 80 },
    { room: '201', type: 'Deluxe King', nights: 28, revenue: '$5,292', adr: '$189', occupancy: 93 },
    { room: '202', type: 'Deluxe Twin', nights: 25, revenue: '$4,475', adr: '$179', occupancy: 83 },
    { room: '101', type: 'Standard King', nights: 27, revenue: '$4,023', adr: '$149', occupancy: 87 },
  ];

  constructor(private readonly reportsService: ReportsService) {
    void this.reportsService;
  }

  get metrics(): ReportMetric[] {
    return [
      {
        label: 'Total Revenue',
        value: '$42,800',
        helper: '+12% vs April',
        icon: '$',
        tone: 'blue',
      },
      {
        label: 'Total Bookings',
        value: '184',
        helper: '+8% vs April',
        icon: '📅',
        tone: 'green',
      },
      {
        label: 'Avg Occupancy',
        value: '74%',
        helper: '+5% vs April',
        icon: '%',
        tone: 'violet',
      },
      {
        label: 'ADR',
        value: '$187',
        helper: '+4% vs April',
        icon: '⭐',
        tone: 'amber',
      },
      {
        label: 'RevPAR',
        value: '$146',
        helper: '+8% vs April',
        icon: 'R',
        tone: 'red',
      },
    ];
  }

  get bookingSourceTotal(): number {
    return this.bookingSources.reduce((sum, source) => sum + source.value, 0);
  }

  get averageOccupancyByType(): Array<{ label: string; rooms: number; percent: number; color: string }> {
    return [
      { label: 'Standard', rooms: 20, percent: 48, color: '#3b82f6' },
      { label: 'Deluxe', rooms: 13, percent: 31, color: '#22c55e' },
      { label: 'Suites', rooms: 6, percent: 14, color: '#f59e0b' },
      { label: 'OOO', rooms: 3, percent: 7, color: '#ef4444' },
    ];
  }

  weekLabel(index: number): string {
    return `Week ${index + 1}`;
  }
}
