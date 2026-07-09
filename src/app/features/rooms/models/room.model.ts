export type RoomStatus = 'Available' | 'Occupied' | 'Cleaning' | 'Out of Order';

export type HousekeepingStatus =
  | 'Clean'
  | 'Dirty'
  | 'In Progress'
  | 'Maintenance'
  | 'DND';

export interface Room {
  roomNo: string;
  type: string;
  floor: string;
  beds: string;
  rateNight: number;
  status: RoomStatus;
  housekeeping: HousekeepingStatus;
  currentGuest: string;
}

export type StayTone = 'occupied' | 'confirmed' | 'vip' | 'hold' | 'ooo';

export interface RoomStay {
  id: string;
  roomNo: string;
  label: string;
  startDate: string;
  endDate: string;
  tone: StayTone;
}

export interface NewRoomInput {
  roomNo: string;
  type: string;
  floor: string;
  beds: string;
  rateNight: number;
}

export interface UpdateRoomInput {
  type: string;
  floor: string;
  beds: string;
  rateNight: number;
  status: RoomStatus;
  housekeeping: HousekeepingStatus;
  currentGuest: string;
}
