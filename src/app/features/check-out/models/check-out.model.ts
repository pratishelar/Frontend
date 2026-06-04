export interface CheckOutStat {
  title: string;
  value: string;
  subtitle: string;
  iconClass: string;
  tone: 'amber' | 'green' | 'yellow' | 'red' | 'violet';
}

export interface CheckOutQueueRow {
  confNo: string;
  initials: string;
  guest: string;
  tier: string;
  room: string;
  roomType: string;
  dueBy: string;
  nights: number;
  balanceDue: string;
  folio: 'Ready' | 'Charges added' | 'Review needed' | 'Cancelled';
  notes: string;
  status: 'Overdue' | 'Pending' | 'Late CO' | 'Cancelled';
}

export interface FolioLineItem {
  category: string;
  description: string;
  amount: string;
  badge?: string;
}

export interface CheckoutAction {
  iconClass: string;
  label: string;
  note?: string;
  tone: 'gold' | 'info' | 'success' | 'violet' | 'neutral';
}
