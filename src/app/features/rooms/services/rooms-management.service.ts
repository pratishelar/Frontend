import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NewRoomInput, Room, RoomStay, UpdateRoomInput } from '../models/room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomsManagementService {
  private readonly roomsSubject = new BehaviorSubject<Room[]>([
    {
      roomNo: '101',
      type: 'Standard King',
      floor: '1',
      beds: '1 King',
      rateNight: 149,
      status: 'Occupied',
      housekeeping: 'Clean',
      currentGuest: 'J. Smith',
    },
    {
      roomNo: '102',
      type: 'Standard Queen',
      floor: '1',
      beds: '1 Queen',
      rateNight: 129,
      status: 'Available',
      housekeeping: 'Clean',
      currentGuest: '—',
    },
    {
      roomNo: '103',
      type: 'Standard King',
      floor: '1',
      beds: '1 King',
      rateNight: 149,
      status: 'Available',
      housekeeping: 'Dirty',
      currentGuest: '—',
    },
    {
      roomNo: '104',
      type: 'Standard Queen',
      floor: '1',
      beds: '1 Queen',
      rateNight: 129,
      status: 'Out of Order',
      housekeeping: 'Maintenance',
      currentGuest: '—',
    },
    {
      roomNo: '105',
      type: 'Standard King',
      floor: '1',
      beds: '1 King',
      rateNight: 149,
      status: 'Occupied',
      housekeeping: 'Clean',
      currentGuest: 'D. Park',
    },
    {
      roomNo: '201',
      type: 'Deluxe King',
      floor: '2',
      beds: '1 King',
      rateNight: 189,
      status: 'Occupied',
      housekeeping: 'DND',
      currentGuest: 'M. Garcia',
    },
    {
      roomNo: '202',
      type: 'Deluxe Twin',
      floor: '2',
      beds: '2 Twins',
      rateNight: 179,
      status: 'Occupied',
      housekeeping: 'Clean',
      currentGuest: 'R. Patel',
    },
    {
      roomNo: '203',
      type: 'Deluxe King',
      floor: '2',
      beds: '1 King',
      rateNight: 189,
      status: 'Cleaning',
      housekeeping: 'In Progress',
      currentGuest: '—',
    },
    {
      roomNo: '204',
      type: 'Deluxe Queen',
      floor: '2',
      beds: '1 Queen',
      rateNight: 179,
      status: 'Available',
      housekeeping: 'Clean',
      currentGuest: '—',
    },
    {
      roomNo: '301',
      type: 'Junior Suite',
      floor: '3',
      beds: '1K + Sofa',
      rateNight: 289,
      status: 'Available',
      housekeeping: 'Clean',
      currentGuest: '—',
    },
    {
      roomNo: '302',
      type: 'Suite Deluxe',
      floor: '3',
      beds: '1K + Sofa',
      rateNight: 329,
      status: 'Available',
      housekeeping: 'Clean',
      currentGuest: '—',
    },
    {
      roomNo: '305',
      type: 'Suite Ocean',
      floor: '3',
      beds: '1K + Sofa',
      rateNight: 349,
      status: 'Occupied',
      housekeeping: 'DND',
      currentGuest: 'L. Wong',
    },
  ]);

  private readonly staysSubject = new BehaviorSubject<RoomStay[]>([
    {
      id: 'st-101-1',
      roomNo: '101',
      label: 'J. Smith',
      startDate: '2026-05-29',
      endDate: '2026-06-01',
      tone: 'occupied',
    },
    {
      id: 'st-102-1',
      roomNo: '102',
      label: 'D. Wilson',
      startDate: '2026-06-03',
      endDate: '2026-06-06',
      tone: 'occupied',
    },
    {
      id: 'st-103-1',
      roomNo: '103',
      label: 'T. Williams',
      startDate: '2026-06-01',
      endDate: '2026-06-05',
      tone: 'confirmed',
    },
    {
      id: 'st-104-1',
      roomNo: '104',
      label: 'Out of Order',
      startDate: '2026-05-29',
      endDate: '2026-06-11',
      tone: 'ooo',
    },
    {
      id: 'st-105-1',
      roomNo: '105',
      label: 'D. Park',
      startDate: '2026-05-30',
      endDate: '2026-05-31',
      tone: 'occupied',
    },
    {
      id: 'st-105-2',
      roomNo: '105',
      label: 'M. Brown',
      startDate: '2026-06-04',
      endDate: '2026-06-07',
      tone: 'vip',
    },
    {
      id: 'st-201-1',
      roomNo: '201',
      label: 'Cleaning',
      startDate: '2026-05-29',
      endDate: '2026-05-30',
      tone: 'hold',
    },
    {
      id: 'st-201-2',
      roomNo: '201',
      label: 'P. Kumar',
      startDate: '2026-06-01',
      endDate: '2026-06-03',
      tone: 'occupied',
    },
    {
      id: 'st-202-1',
      roomNo: '202',
      label: 'R. Patel',
      startDate: '2026-05-29',
      endDate: '2026-05-31',
      tone: 'occupied',
    },
    {
      id: 'st-202-2',
      roomNo: '202',
      label: 'A. Santos',
      startDate: '2026-06-03',
      endDate: '2026-06-06',
      tone: 'confirmed',
    },
    {
      id: 'st-203-1',
      roomNo: '203',
      label: 'Cleaning',
      startDate: '2026-05-29',
      endDate: '2026-05-30',
      tone: 'hold',
    },
    {
      id: 'st-203-2',
      roomNo: '203',
      label: 'S. Martin',
      startDate: '2026-06-01',
      endDate: '2026-06-05',
      tone: 'vip',
    },
    {
      id: 'st-204-1',
      roomNo: '204',
      label: 'D. Park Jr.',
      startDate: '2026-06-01',
      endDate: '2026-06-05',
      tone: 'occupied',
    },
    {
      id: 'st-301-1',
      roomNo: '301',
      label: 'J. Lee',
      startDate: '2026-06-01',
      endDate: '2026-06-05',
      tone: 'vip',
    },
    {
      id: 'st-302-1',
      roomNo: '302',
      label: 'J. Lee Jr.',
      startDate: '2026-06-01',
      endDate: '2026-06-05',
      tone: 'occupied',
    },
    {
      id: 'st-305-1',
      roomNo: '305',
      label: 'L. Wong',
      startDate: '2026-05-29',
      endDate: '2026-06-01',
      tone: 'occupied',
    },
    {
      id: 'st-305-2',
      roomNo: '305',
      label: 'VIP Hold',
      startDate: '2026-06-08',
      endDate: '2026-06-11',
      tone: 'hold',
    },
  ]);

  readonly rooms$ = this.roomsSubject.asObservable();
  readonly stays$ = this.staysSubject.asObservable();

  getRooms(): Room[] {
    return [...this.roomsSubject.value];
  }

  getStays(): RoomStay[] {
    return [...this.staysSubject.value];
  }

  getRoomByNo(roomNo: string): Room | undefined {
    return this.roomsSubject.value.find((room) => room.roomNo === roomNo);
  }

  addRoom(input: NewRoomInput): Room {
    const room: Room = {
      roomNo: input.roomNo.trim(),
      type: input.type,
      floor: input.floor,
      beds: input.beds.trim() || '1 Queen',
      rateNight: Number.isFinite(input.rateNight) ? input.rateNight : 0,
      status: 'Available',
      housekeeping: 'Clean',
      currentGuest: '—',
    };

    this.roomsSubject.next([...this.roomsSubject.value, room]);
    return room;
  }

  updateRoom(roomNo: string, input: UpdateRoomInput): Room | undefined {
    const rooms = this.roomsSubject.value;
    const index = rooms.findIndex((room) => room.roomNo === roomNo);

    if (index === -1) {
      return undefined;
    }

    const updated: Room = {
      ...rooms[index],
      type: input.type,
      floor: input.floor,
      beds: input.beds,
      rateNight: Number.isFinite(input.rateNight) ? input.rateNight : rooms[index].rateNight,
      status: input.status,
      housekeeping: input.housekeeping,
      currentGuest: input.currentGuest.trim() || '—',
    };

    const nextRooms = [...rooms];
    nextRooms[index] = updated;
    this.roomsSubject.next(nextRooms);
    return updated;
  }

  updateStayDates(stayId: string, startDate: string, endDate: string): RoomStay | undefined {
    return this.updateStay(stayId, { startDate, endDate });
  }

  updateStay(
    stayId: string,
    patch: Partial<Pick<RoomStay, 'roomNo' | 'startDate' | 'endDate'>>
  ): RoomStay | undefined {
    const stays = this.staysSubject.value;
    const index = stays.findIndex((stay) => stay.id === stayId);

    if (index === -1) {
      return undefined;
    }

    const updated = {
      ...stays[index],
      ...patch,
    };

    const nextStays = [...stays];
    nextStays[index] = updated;
    this.staysSubject.next(nextStays);
    return updated;
  }
}
