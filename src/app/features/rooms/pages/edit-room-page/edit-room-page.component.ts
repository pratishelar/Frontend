import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HousekeepingStatus, Room, RoomStatus } from '../../models/room.model';
import { RoomsManagementService } from '../../services/rooms-management.service';

@Component({
  selector: 'app-edit-room-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-room-page.component.html',
  styleUrl: './edit-room-page.component.css',
})
export class EditRoomPageComponent {
  readonly statusOptions: RoomStatus[] = ['Available', 'Occupied', 'Cleaning', 'Out of Order'];
  readonly housekeepingOptions: HousekeepingStatus[] = [
    'Clean',
    'Dirty',
    'In Progress',
    'Maintenance',
    'DND',
  ];

  room?: Room;

  type = '';
  floor = '';
  beds = '';
  rateNight = 0;
  status: RoomStatus = 'Available';
  housekeeping: HousekeepingStatus = 'Clean';
  currentGuest = '—';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly roomsService: RoomsManagementService
  ) {
    const roomNo = this.route.snapshot.paramMap.get('roomNo') ?? '';
    this.room = this.roomsService.getRoomByNo(roomNo);

    if (this.room) {
      this.type = this.room.type;
      this.floor = this.room.floor;
      this.beds = this.room.beds;
      this.rateNight = this.room.rateNight;
      this.status = this.room.status;
      this.housekeeping = this.room.housekeeping;
      this.currentGuest = this.room.currentGuest;
    }
  }

  save(): void {
    if (!this.room) {
      return;
    }

    this.roomsService.updateRoom(this.room.roomNo, {
      type: this.type,
      floor: this.floor,
      beds: this.beds,
      rateNight: this.rateNight,
      status: this.status,
      housekeeping: this.housekeeping,
      currentGuest: this.currentGuest,
    });

    this.router.navigate(['/rooms/view-room', this.room.roomNo]);
  }
}
