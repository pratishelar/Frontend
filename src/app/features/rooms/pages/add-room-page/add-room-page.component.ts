import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-room-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './add-room-page.component.html',
  styleUrls: ['./add-room-page.component.css'],
})
export class AddRoomPageComponent {
  readonly roomTypes = ['Standard King', 'Standard Twin', 'Deluxe King', 'Deluxe Twin', 'Suite'];
  readonly floors = ['1', '2', '3', '4'];
  readonly housekeepingModes = ['AM Shift', 'PM Shift', 'Express Turnover'];
}
