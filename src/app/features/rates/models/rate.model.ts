export type RatePlanStatus = 'Active' | 'Paused' | 'Scheduled' | 'Expired';

export type PricingModel = 'Flat' | 'BAR +/-' | 'Occupancy Based';

export interface RatePlan {
  code: string;
  name: string;
  roomType: string;
  boardType: string;
  amount: string;
  pricingModel: PricingModel;
  bookingWindow: string;
  stayWindow: string;
  channels: string;
  status: RatePlanStatus;
}

export interface PromoCode {
  code: string;
  discount: string;
  validFrom: string;
  validTo: string;
  minNights: number;
  maxUses: number;
  applicableRatePlan: string;
  directOnly: boolean;
  status: 'Live' | 'Draft' | 'Expired';
}

export interface RatePlanFilter {
  query?: string;
  roomType?: string;
  channel?: string;
  status?: RatePlanStatus;
}