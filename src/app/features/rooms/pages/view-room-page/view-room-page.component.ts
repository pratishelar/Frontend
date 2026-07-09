import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Room } from '../../models/room.model';
import { RoomsManagementService } from '../../services/rooms-management.service';

@Component({
  selector: 'app-view-room-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-room-page.component.html',
  styleUrl: './view-room-page.component.css',
})
export class ViewRoomPageComponent {
  room?: Room;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly roomsService: RoomsManagementService
  ) {
    const roomNo = this.route.snapshot.paramMap.get('roomNo') ?? '';
    this.room = this.roomsService.getRoomByNo(roomNo);
  }
}
