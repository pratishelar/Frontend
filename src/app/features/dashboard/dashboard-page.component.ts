import { Component } from '@angular/core';
import { DashboardAnalyticsComponent } from './components/dashboard-analytics/dashboard-analytics.component';
import { DashboardMetricsComponent } from './components/dashboard-metrics/dashboard-metrics.component';
import { DashboardSummaryComponent } from './components/dashboard-summary/dashboard-summary.component';
import { DashboardTasksComponent } from './components/dashboard-tasks/dashboard-tasks.component';
import {
  FloorStatus,
  MetricCard,
  OccupancyPoint,
  TaskRow,
} from './models/dashboard.model';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    DashboardMetricsComponent,
    DashboardAnalyticsComponent,
    DashboardTasksComponent,
    DashboardSummaryComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent {
  readonly cards: MetricCard[] = [
    {
      title: "Today's Check-ins",
      value: '12',
      trend: '3 from yesterday',
      trendUp: true,
      iconClass: 'bi-box-arrow-in-right',
    },
    {
      title: "Today's Check-outs",
      value: '8',
      trend: '2 from yesterday',
      trendUp: false,
      iconClass: 'bi-box-arrow-right',
    },
    {
      title: 'Occupancy Rate',
      value: '78%',
      trend: '5% this week',
      trendUp: true,
      iconClass: 'bi-pie-chart-fill',
    },
    {
      title: "Today's Revenue",
      value: '$4,280',
      trend: '$620 vs last Fri',
      trendUp: true,
      iconClass: 'bi-currency-dollar',
    },
  ];

  readonly occupancy: OccupancyPoint[] = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 72 },
    { day: 'Wed', value: 78 },
    { day: 'Thu', value: 84 },
    { day: 'Fri', value: 88 },
    { day: 'Sat', value: 76 },
    { day: 'Sun', value: 68 },
  ];

  readonly floors: FloorStatus[] = [
    {
      floor: 'Floor 1',
      rooms: [
        { number: '101', status: 'available' },
        { number: '102', status: 'occupied' },
        { number: '103', status: 'available' },
        { number: '104', status: 'ooo' },
        { number: '105', status: 'available' },
        { number: '106', status: 'occupied' },
      ],
    },
    {
      floor: 'Floor 2',
      rooms: [
        { number: '201', status: 'available' },
        { number: '202', status: 'occupied' },
        { number: '203', status: 'cleaning' },
        { number: '204', status: 'available' },
        { number: '205', status: 'available' },
        { number: '206', status: 'ooo' },
      ],
    },
    {
      floor: 'Floor 3',
      rooms: [
        { number: '301', status: 'occupied' },
        { number: '302', status: 'available' },
        { number: '303', status: 'available' },
        { number: '304', status: 'occupied' },
        { number: '305', status: 'cleaning' },
        { number: '306', status: 'available' },
      ],
    },
  ];

  readonly tasks: TaskRow[] = [
    {
      guest: 'John Smith',
      room: '201 · Deluxe',
      type: 'Check-in',
      time: '2:00 PM',
      source: 'Direct',
      status: 'Confirmed',
    },
    {
      guest: 'Maria Garcia',
      room: '305 · Suite',
      type: 'Check-out',
      time: '11:00 AM',
      source: 'Booking.com',
      status: 'Checkout Due',
    },
    {
      guest: 'Raj Patel',
      room: '412 · Std',
      type: 'Check-in',
      time: '4:00 PM',
      source: 'Expedia',
      status: 'Confirmed',
    },
    {
      guest: 'Lisa Wong',
      room: '118 · Std',
      type: 'Walk-in',
      time: 'Now',
      source: 'Walk-in',
      status: 'In Progress',
    },
    {
      guest: 'Carlos Ruiz',
      room: '220 · Deluxe',
      type: 'Check-out',
      time: '12:00 PM',
      source: 'Airbnb',
      status: 'Checked Out',
    },
  ];

  readonly revenueBars = [58, 66, 72, 76, 84, 90];
}
