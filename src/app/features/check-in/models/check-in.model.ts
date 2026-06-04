export interface CheckInQueueStats {
  title: string;
  value: string;
  subtitle: string;
  iconClass: string;
  tone: 'primary' | 'success' | 'warning' | 'violet' | 'danger';
}

export interface CheckInQueueRow {
  confNo: string;
  initials: string;
  guest: string;
  tier: string;
  room: string;
  roomType: string;
  eta: string;
  nights: number;
  amount: string;
  ratePlan: string;
  notes: string;
  status: 'VIP' | 'Confirmed' | 'Late Arrival' | 'Unconfirmed';
}
