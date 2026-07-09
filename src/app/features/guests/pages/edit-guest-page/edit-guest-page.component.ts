import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GuestProfile, GuestStatus, GuestTier } from '../../models/guest.model';
import { GuestProfilesService } from '../../services/guest-profiles.service';

@Component({
  selector: 'app-edit-guest-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-guest-page.component.html',
  styleUrl: './edit-guest-page.component.css',
})
export class EditGuestPageComponent {
  readonly tierOptions: GuestTier[];
  readonly statusOptions: GuestStatus[];

  guest?: GuestProfile;

  fullName = '';
  email = '';
  phone = '';
  country = '';
  tier: GuestTier = 'New';
  status: GuestStatus = 'Active';
  preferences = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly guestService: GuestProfilesService
  ) {
    this.tierOptions = this.guestService.getTierOptions();
    this.statusOptions = this.guestService.getStatusOptions();

    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.guest = this.guestService.getGuestById(id);

    if (this.guest) {
      this.fullName = this.guest.fullName;
      this.email = this.guest.email;
      this.phone = this.guest.phone;
      this.country = this.guest.country;
      this.tier = this.guest.tier;
      this.status = this.guest.status;
      this.preferences = this.guest.preferences;
    }
  }

  saveGuest(): void {
    if (!this.guest) {
      return;
    }

    this.guestService.updateGuest(this.guest.id, {
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      country: this.country,
      tier: this.tier,
      status: this.status,
      preferences: this.preferences,
    });

    this.router.navigate(['/guests/view-guest', this.guest.id]);
  }
}
