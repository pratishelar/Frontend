export type GuestTier = 'New' | 'Silver' | 'Gold' | 'Platinum';

export type GuestStatus = 'Active' | 'VIP' | 'Blacklisted';

export interface GuestProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  tier: GuestTier;
  status: GuestStatus;
  lastStay: string;
  totalStays: number;
  lifetimeValue: number;
  preferences: string;
}

export interface NewGuestInput {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  tier: GuestTier;
  status: GuestStatus;
  preferences: string;
}

export interface UpdateGuestInput {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  tier: GuestTier;
  status: GuestStatus;
  preferences: string;
}
