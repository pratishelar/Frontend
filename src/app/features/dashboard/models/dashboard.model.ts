export interface MetricCard {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  iconClass: string;
}

export interface OccupancyPoint {
  day: string;
  value: number;
}

export interface Room {
  number: string;
  status: 'available' | 'occupied' | 'cleaning' | 'ooo';
}

export interface FloorStatus {
  floor: string;
  rooms: Room[];
}

export interface TaskRow {
  guest: string;
  room: string;
  type: string;
  time: string;
  source: string;
  status: 'Confirmed' | 'Checkout Due' | 'In Progress' | 'Checked Out';
}
