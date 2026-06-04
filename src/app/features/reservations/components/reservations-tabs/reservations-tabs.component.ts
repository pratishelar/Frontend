import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-reservations-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservations-tabs.component.html',
  styleUrl: './reservations-tabs.component.css',
})
export class ReservationsTabsComponent {
  @Input({ required: true }) tabs: string[] = [];
  @Input({ required: true }) activeTab = '';
  @Output() tabChange = new EventEmitter<string>();
}
