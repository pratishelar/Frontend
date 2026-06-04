export interface ReservationStepperItem {
  label: string;
  done?: boolean;
  active?: boolean;
}

export interface SummaryLineItem {
  label: string;
  value: string;
}

export interface GuestSummaryCard {
  initials: string;
  name: string;
  tag: string;
  details: string;
}
