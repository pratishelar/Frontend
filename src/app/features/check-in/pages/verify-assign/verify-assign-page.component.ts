import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-verify-assign-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './verify-assign-page.component.html',
  styleUrl: './verify-assign-page.component.css',
})
export class VerifyAssignPageComponent {}
