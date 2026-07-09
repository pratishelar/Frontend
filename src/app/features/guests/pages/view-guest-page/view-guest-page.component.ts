import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GuestProfile } from '../../models/guest.model';
import { GuestProfilesService } from '../../services/guest-profiles.service';

@Component({
  selector: 'app-view-guest-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-guest-page.component.html',
  styleUrl: './view-guest-page.component.css',
})
export class ViewGuestPageComponent {
  guest?: GuestProfile;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly guestService: GuestProfilesService
  ) {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.guest = this.guestService.getGuestById(id);
  }
}
