export type ReservationPayment =
  | 'Paid'
  | 'Partially Paid'
  | 'Pending'
  | 'Refunded'
  | 'Deposit'
  | 'Invoiced';

export type ReservationStatus =
  | 'Confirmed'
  | 'Checked In'
  | 'Checked Out'
  | 'Cancelled'
  | 'No-show'
  | 'Pending'
  | 'In Progress'
  | 'Checkout Due';

export interface Reservation {
  confNo: string;
  initials: string;
  guest: string;
  email: string;
  room: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  amount: string;
  payment: ReservationPayment;
  status: ReservationStatus;
  source: string;
  ratePlan: string;
}
