import { Injectable } from '@angular/core';
import { PromoCode, RatePlan, RatePlanFilter, RatePlanStatus } from '../models/rate.model';

@Injectable({
  providedIn: 'root',
})
export class RateManagementService {
  private readonly ratePlans: RatePlan[] = [
    {
      code: 'BAR-K',
      name: 'Best Available - King',
      roomType: 'Standard King',
      boardType: 'Room Only',
      amount: '$169',
      pricingModel: 'BAR +/-',
      bookingWindow: '0-365 days',
      stayWindow: 'All year',
      channels: 'Web, OTA, Walk-in',
      status: 'Active',
    },
    {
      code: 'ADV14',
      name: 'Advance Saver 14D',
      roomType: 'Standard Queen',
      boardType: 'Breakfast',
      amount: '$139',
      pricingModel: 'Flat',
      bookingWindow: '14-120 days',
      stayWindow: 'Sun-Thu',
      channels: 'Web, OTA',
      status: 'Active',
    },
    {
      code: 'WKND-S',
      name: 'Weekend Suite Escape',
      roomType: 'Junior Suite',
      boardType: 'Breakfast + Late CO',
      amount: '$299',
      pricingModel: 'Flat',
      bookingWindow: '0-60 days',
      stayWindow: 'Fri-Sat',
      channels: 'Web',
      status: 'Active',
    },
    {
      code: 'CORP-A',
      name: 'Corporate Tier A',
      roomType: 'Deluxe King',
      boardType: 'Room Only',
      amount: '$179',
      pricingModel: 'BAR +/-',
      bookingWindow: '0-365 days',
      stayWindow: 'Mon-Thu',
      channels: 'GDS, Direct',
      status: 'Paused',
    },
    {
      code: 'FEST26',
      name: 'Festival Season 2026',
      roomType: 'All',
      boardType: 'Room Only',
      amount: '$219',
      pricingModel: 'Occupancy Based',
      bookingWindow: '0-180 days',
      stayWindow: 'Oct-Nov',
      channels: 'Web, OTA',
      status: 'Scheduled',
    },
    {
      code: 'FLASH7',
      name: 'Last Minute 7D',
      roomType: 'Deluxe King',
      boardType: 'Room Only',
      amount: '$149',
      pricingModel: 'Flat',
      bookingWindow: '0-7 days',
      stayWindow: 'All year',
      channels: 'Web',
      status: 'Expired',
    },
  ];

  private readonly promoCodes: PromoCode[] = [
    {
      code: 'SUMMER20',
      discount: '20%',
      validFrom: '2026-06-01',
      validTo: '2026-08-31',
      minNights: 2,
      maxUses: 500,
      applicableRatePlan: 'All Active Plans',
      directOnly: true,
      status: 'Live',
    },
    {
      code: 'WEEKDAY10',
      discount: '10%',
      validFrom: '2026-06-01',
      validTo: '2026-12-31',
      minNights: 1,
      maxUses: 300,
      applicableRatePlan: 'BAR-K',
      directOnly: false,
      status: 'Live',
    },
    {
      code: 'CORP500',
      discount: '$50',
      validFrom: '2026-07-01',
      validTo: '2026-10-31',
      minNights: 2,
      maxUses: 120,
      applicableRatePlan: 'CORP-A',
      directOnly: true,
      status: 'Draft',
    },
    {
      code: 'SPRING15',
      discount: '15%',
      validFrom: '2026-02-01',
      validTo: '2026-04-30',
      minNights: 2,
      maxUses: 200,
      applicableRatePlan: 'ADV14',
      directOnly: false,
      status: 'Expired',
    },
  ];

  getRatePlans(): RatePlan[] {
    return [...this.ratePlans];
  }

  getPromoCodes(): PromoCode[] {
    return [...this.promoCodes];
  }

  getRatePlanByCode(code: string): RatePlan | undefined {
    return this.ratePlans.find((plan) => plan.code.toLowerCase() === code.toLowerCase());
  }

  getPromoCodeByCode(code: string): PromoCode | undefined {
    return this.promoCodes.find((promo) => promo.code.toLowerCase() === code.toLowerCase());
  }

  getStatuses(): Array<'All' | RatePlanStatus> {
    return ['All', 'Active', 'Paused', 'Scheduled', 'Expired'];
  }

  getRoomTypes(): string[] {
    const roomTypes = new Set(this.ratePlans.map((plan) => plan.roomType));
    return ['All', ...Array.from(roomTypes)];
  }

  getChannels(): string[] {
    const channels = new Set(
      this.ratePlans
        .flatMap((plan) => plan.channels.split(','))
        .map((value) => value.trim())
        .filter((value) => value.length > 0)
    );

    return ['All', ...Array.from(channels)];
  }

  filterRatePlans(filter: RatePlanFilter): RatePlan[] {
    const query = (filter.query ?? '').trim().toLowerCase();

    return this.ratePlans.filter((plan) => {
      const matchesQuery =
        query.length === 0 ||
        plan.code.toLowerCase().includes(query) ||
        plan.name.toLowerCase().includes(query);

      const matchesRoomType =
        !filter.roomType || filter.roomType === 'All' || plan.roomType === filter.roomType;

      const matchesChannel =
        !filter.channel ||
        filter.channel === 'All' ||
        plan.channels.toLowerCase().includes(filter.channel.toLowerCase());

      const matchesStatus =
        !filter.status || plan.status === filter.status;

      return matchesQuery && matchesRoomType && matchesChannel && matchesStatus;
    });
  }

  getRateStatusCounts(): Record<'All' | RatePlanStatus, number> {
    const counts: Record<'All' | RatePlanStatus, number> = {
      All: this.ratePlans.length,
      Active: 0,
      Paused: 0,
      Scheduled: 0,
      Expired: 0,
    };

    for (const plan of this.ratePlans) {
      counts[plan.status] += 1;
    }

    return counts;
  }
}