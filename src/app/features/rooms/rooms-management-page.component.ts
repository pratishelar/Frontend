import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface RoomMetric {
  label: string;
  value: string;
  helper: string;
  icon: string;
  tone: 'blue' | 'green' | 'amber' | 'violet' | 'red';
}

interface RoomRow {
  roomNo: string;
  type: string;
  floor: string;
  beds: string;
  rateNight: string;
  status: 'Available' | 'Occupied' | 'Cleaning' | 'Out of Order';
  housekeeping: 'Clean' | 'Dirty' | 'In Progress' | 'Maintenance' | 'DND';
  currentGuest: string;
}

interface RoomTab {
  label: string;
  count: number;
  active?: boolean;
}

@Component({
  selector: 'app-rooms-management-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms-management-page.component.html',
  styleUrl: './rooms-management-page.component.css',
})
export class RoomsManagementPageComponent {
  readonly metrics: RoomMetric[] = [
    {
      label: 'Total Rooms',
      value: '42',
      helper: 'All floors',
      icon: 'bi-door-open',
      tone: 'blue',
    },
    {
      label: 'Available',
      value: '22',
      helper: 'Ready for guests',
      icon: 'bi-check-lg',
      tone: 'green',
    },
    {
      label: 'Occupied',
      value: '13',
      helper: 'Currently in use',
      icon: 'bi-person-fill',
      tone: 'amber',
    },
    {
      label: 'Cleaning',
      value: '5',
      helper: 'Housekeeping',
      icon: 'bi-brush-fill',
      tone: 'violet',
    },
    {
      label: 'Out of Order',
      value: '2',
      helper: 'Maintenance',
      icon: 'bi-exclamation-triangle-fill',
      tone: 'red',
    },
  ];

  readonly roomTabs: RoomTab[] = [
    { label: 'All Rooms', count: 42, active: true },
    { label: 'Available', count: 22 },
    { label: 'Occupied', count: 13 },
    { label: 'Cleaning', count: 5 },
    { label: 'Out of Order', count: 2 },
  ];

  readonly rooms: RoomRow[] = [
    {
      roomNo: '101',
      type: 'Standard King',
      floor: '1',
      beds: '1 King',
      rateNight: '$149',
      status: 'Occupied',
      housekeeping: 'Clean',
      currentGuest: 'J. Smith',
    },
    {
      roomNo: '102',
      type: 'Standard Queen',
      floor: '1',
      beds: '1 Queen',
      rateNight: '$129',
      status: 'Available',
      housekeeping: 'Clean',
      currentGuest: '—',
    },
    {
      roomNo: '103',
      type: 'Standard King',
      floor: '1',
      beds: '1 King',
      rateNight: '$149',
      status: 'Available',
      housekeeping: 'Dirty',
      currentGuest: '—',
    },
    {
      roomNo: '104',
      type: 'Standard Queen',
      floor: '1',
      beds: '1 Queen',
      rateNight: '$129',
      status: 'Out of Order',
      housekeeping: 'Maintenance',
      currentGuest: '—',
    },
    {
      roomNo: '201',
      type: 'Deluxe King',
      floor: '2',
      beds: '1 King',
      rateNight: '$189',
      status: 'Occupied',
      housekeeping: 'DND',
      currentGuest: 'M. Garcia',
    },
    {
      roomNo: '202',
      type: 'Deluxe Twin',
      floor: '2',
      beds: '2 Twins',
      rateNight: '$179',
      status: 'Occupied',
      housekeeping: 'Clean',
      currentGuest: 'R. Patel',
    },
    {
      roomNo: '203',
      type: 'Deluxe King',
      floor: '2',
      beds: '1 King',
      rateNight: '$189',
      status: 'Cleaning',
      housekeeping: 'In Progress',
      currentGuest: '—',
    },
    {
      roomNo: '301',
      type: 'Junior Suite',
      floor: '3',
      beds: '1K + Sofa',
      rateNight: '$289',
      status: 'Available',
      housekeeping: 'Clean',
      currentGuest: '—',
    },
    {
      roomNo: '305',
      type: 'Suite Ocean',
      floor: '3',
      beds: '1K + Sofa',
      rateNight: '$349',
      status: 'Occupied',
      housekeeping: 'DND',
      currentGuest: 'L. Wong',
    },
    {
      roomNo: '412',
      type: 'Standard Room',
      floor: '4',
      beds: '1 Queen',
      rateNight: '$139',
      status: 'Occupied',
      housekeeping: 'Clean',
      currentGuest: 'Raj Patel',
    },
  ];
}
