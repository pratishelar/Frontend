import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RoomsManagementService } from '../../services/rooms-management.service';

@Component({
  selector: 'app-add-room-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-room-page.component.html',
  styleUrls: ['./add-room-page.component.css'],
})
export class AddRoomPageComponent {
  readonly roomTypes = ['Standard King', 'Standard Twin', 'Deluxe King', 'Deluxe Twin', 'Suite'];
  readonly floors = ['1', '2', '3', '4'];
  readonly housekeepingModes = ['AM Shift', 'PM Shift', 'Express Turnover'];

  roomNo = '';
  roomType = this.roomTypes[0];
  floor = this.floors[0];
  beds = '1 King';
  maxOccupancy = 2;
  rateNight = 189;
  errorMessage = '';

  constructor(
    private readonly roomsService: RoomsManagementService,
    private readonly router: Router
  ) {}

  saveRoom(): void {
    if (!this.roomNo.trim()) {
      this.errorMessage = 'Room number is required.';
      return;
    }

    this.roomsService.addRoom({
      roomNo: this.roomNo,
      type: this.roomType,
      floor: this.floor,
      beds: this.beds,
      rateNight: this.rateNight,
    });

    this.router.navigate(['/rooms']);
  }
}
