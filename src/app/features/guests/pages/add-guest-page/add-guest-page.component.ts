import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GuestStatus, GuestTier } from '../../models/guest.model';
import { GuestProfilesService } from '../../services/guest-profiles.service';

@Component({
  selector: 'app-add-guest-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-guest-page.component.html',
  styleUrl: './add-guest-page.component.css',
})
export class AddGuestPageComponent {
  readonly tierOptions: GuestTier[];
  readonly statusOptions: GuestStatus[];
  readonly salutationOptions = ['Mr.', 'Ms.', 'Mrs.', 'Dr.'];
  readonly genderOptions = ['Prefer not to say', 'Female', 'Male', 'Non-binary'];
  readonly phoneTypeOptions = ['Mobile', 'Home', 'Work'];
  readonly countryCodeOptions = ['+1', '+44', '+34', '+91', '+65'];
  readonly countryShortOptions = ['CA', 'US', 'ES', 'IN', 'GB'];
  readonly loyaltyTierOptions = ['None (New Member)', 'Silver', 'Gold', 'Platinum'];
  readonly noPreferenceOptions = ['No Preference', 'Low Floor', 'High Floor'];
  readonly bedTypeOptions = ['No Preference', 'King', 'Twin', 'Queen'];
  readonly viewOptions = ['No Preference', 'City', 'Garden', 'Ocean'];
  readonly dietaryOptions = ['None', 'Vegetarian', 'Vegan', 'Halal', 'Kosher'];

  salutation = 'Mr.';
  firstName = '';
  lastName = '';
  dateOfBirth = '';
  gender = 'Prefer not to say';
  nationality = 'Canada';
  email = '';
  emailOptIn = true;
  phoneCountryCode = '+1';
  phoneNumber = '';
  phoneType = 'Mobile';
  passportNumber = '';
  passportExpiry = '';
  streetAddress = '';
  city = '';
  state = '';
  postalCode = '';
  countryCode = 'CA';
  vehiclePlate = '';
  emergencyContactName = '';
  emergencyPhone = '';
  specialNeeds = '';

  loyaltyTier = 'None (New Member)';
  loyaltyPoints = '0';
  memberSince = '01 Jun 2026';
  preferredRoomType = 'No Preference';
  preferredFloor = 'No Preference';
  bedType = 'No Preference';
  roomLocation = 'No Preference';
  viewPreference = 'No Preference';
  dietaryRequirement = 'None';
  vegetarian = false;
  vegan = false;
  halal = false;
  kosher = false;
  glutenFree = false;
  nutAllergy = false;
  pillowPreference = 'No Preference';
  newspaper = 'No Preference';
  smsNotifications = true;

  status: GuestStatus = 'Active';
  marketingEmails = true;
  stayAnalytics = true;
  shareWithPartners = false;
  internalNotes = '';
  errorMessage = '';

  constructor(
    private readonly guestService: GuestProfilesService,
    private readonly router: Router
  ) {
    this.tierOptions = this.guestService.getTierOptions();
    this.statusOptions = this.guestService.getStatusOptions();
  }

  get previewName(): string {
    const first = this.firstName.trim();
    const last = this.lastName.trim();
    return `${first} ${last}`.trim() || 'New Guest';
  }

  saveGuest(): void {
    const fullName = `${this.firstName.trim()} ${this.lastName.trim()}`.trim();

    if (!fullName || !this.email.trim() || !this.phoneNumber.trim()) {
      this.errorMessage = 'First name, last name, email, and phone are required.';
      return;
    }

    const dietaryFlags: string[] = [];
    if (this.vegetarian) dietaryFlags.push('Vegetarian');
    if (this.vegan) dietaryFlags.push('Vegan');
    if (this.halal) dietaryFlags.push('Halal');
    if (this.kosher) dietaryFlags.push('Kosher');
    if (this.glutenFree) dietaryFlags.push('Gluten-Free');
    if (this.nutAllergy) dietaryFlags.push('Nut Allergy');

    const preferences = [
      `Tier: ${this.loyaltyTier}`,
      `Room: ${this.preferredRoomType}, Floor: ${this.preferredFloor}, Bed: ${this.bedType}`,
      `Location: ${this.roomLocation}, View: ${this.viewPreference}`,
      `Dietary: ${this.dietaryRequirement}${dietaryFlags.length ? ` (${dietaryFlags.join(', ')})` : ''}`,
      `Pillow: ${this.pillowPreference}, Newspaper: ${this.newspaper}`,
      `Contact: ${this.emailOptIn ? 'Email Opt-in' : 'Email Opt-out'}, ${this.smsNotifications ? 'SMS On' : 'SMS Off'}`,
      this.specialNeeds.trim() ? `Special Needs: ${this.specialNeeds.trim()}` : '',
      this.internalNotes.trim() ? `Staff Notes: ${this.internalNotes.trim()}` : '',
    ]
      .filter(Boolean)
      .join(' | ');

    const guest = this.guestService.addGuest({
      fullName,
      email: this.email.trim(),
      phone: `${this.phoneCountryCode} ${this.phoneNumber.trim()}`.trim(),
      country: this.nationality.trim() || this.countryCode,
      tier: this.toGuestTier(this.loyaltyTier),
      status: this.status,
      preferences,
    });

    this.router.navigate(['/guests/view-guest', guest.id]);
  }

  private toGuestTier(value: string): GuestTier {
    if (value === 'Silver' || value === 'Gold' || value === 'Platinum') {
      return value;
    }

    return 'New';
  }
}
