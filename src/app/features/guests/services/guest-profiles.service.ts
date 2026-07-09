import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  GuestProfile,
  GuestStatus,
  GuestTier,
  NewGuestInput,
  UpdateGuestInput,
} from '../models/guest.model';

@Injectable({
  providedIn: 'root',
})
export class GuestProfilesService {
  private readonly guestsSubject = new BehaviorSubject<GuestProfile[]>([
    {
      id: 'GST-1001',
      fullName: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 555 0171',
      country: 'USA',
      tier: 'Gold',
      status: 'Active',
      lastStay: '2026-05-29',
      totalStays: 8,
      lifetimeValue: 4280,
      preferences: 'High floor, late check-in',
    },
    {
      id: 'GST-1002',
      fullName: 'Maria Garcia',
      email: 'maria@email.com',
      phone: '+34 620 004 908',
      country: 'Spain',
      tier: 'Silver',
      status: 'VIP',
      lastStay: '2026-05-24',
      totalStays: 5,
      lifetimeValue: 2390,
      preferences: 'King bed, airport transfer',
    },
    {
      id: 'GST-1003',
      fullName: 'Raj Patel',
      email: 'raj@email.com',
      phone: '+91 98700 12345',
      country: 'India',
      tier: 'Platinum',
      status: 'Active',
      lastStay: '2026-06-01',
      totalStays: 13,
      lifetimeValue: 9100,
      preferences: 'Quiet room, vegetarian meals',
    },
    {
      id: 'GST-1004',
      fullName: 'Lisa Wong',
      email: 'lisa.wong@email.com',
      phone: '+65 8123 1110',
      country: 'Singapore',
      tier: 'New',
      status: 'Active',
      lastStay: '2026-05-30',
      totalStays: 1,
      lifetimeValue: 410,
      preferences: 'Near elevator',
    },
    {
      id: 'GST-1005',
      fullName: 'Carlos Ruiz',
      email: 'carlos@email.com',
      phone: '+52 55 9911 2000',
      country: 'Mexico',
      tier: 'Silver',
      status: 'Blacklisted',
      lastStay: '2026-03-14',
      totalStays: 3,
      lifetimeValue: 920,
      preferences: 'N/A',
    },
  ]);

  readonly guests$ = this.guestsSubject.asObservable();

  getGuests(): GuestProfile[] {
    return [...this.guestsSubject.value];
  }

  getGuestById(id: string): GuestProfile | undefined {
    return this.guestsSubject.value.find((guest) => guest.id === id);
  }

  addGuest(input: NewGuestInput): GuestProfile {
    const nextId = `GST-${String(1000 + this.guestsSubject.value.length + 1)}`;

    const guest: GuestProfile = {
      id: nextId,
      fullName: input.fullName.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      country: input.country.trim(),
      tier: input.tier,
      status: input.status,
      lastStay: '—',
      totalStays: 0,
      lifetimeValue: 0,
      preferences: input.preferences.trim() || '—',
    };

    this.guestsSubject.next([...this.guestsSubject.value, guest]);
    return guest;
  }

  updateGuest(id: string, input: UpdateGuestInput): GuestProfile | undefined {
    const guests = this.guestsSubject.value;
    const index = guests.findIndex((guest) => guest.id === id);

    if (index === -1) {
      return undefined;
    }

    const updated: GuestProfile = {
      ...guests[index],
      fullName: input.fullName.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      country: input.country.trim(),
      tier: input.tier,
      status: input.status,
      preferences: input.preferences.trim() || '—',
    };

    const nextGuests = [...guests];
    nextGuests[index] = updated;
    this.guestsSubject.next(nextGuests);

    return updated;
  }

  getTierOptions(): GuestTier[] {
    return ['New', 'Silver', 'Gold', 'Platinum'];
  }

  getStatusOptions(): GuestStatus[] {
    return ['Active', 'VIP', 'Blacklisted'];
  }
}
