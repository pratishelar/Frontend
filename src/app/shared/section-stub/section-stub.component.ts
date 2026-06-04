import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-section-stub',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-stub.component.html',
  styleUrl: './section-stub.component.css',
})
export class SectionStubComponent {
  private readonly route = inject(ActivatedRoute);

  readonly title = computed(() => this.route.snapshot.data['title'] ?? 'Section');
  readonly subtitle = computed(
    () => this.route.snapshot.data['subtitle'] ?? 'Scaffolded from Figma and requirements.'
  );
  readonly nextSteps = computed<string[]>(
    () =>
      this.route.snapshot.data['nextSteps'] ?? [
        'Connect route to dedicated feature component.',
        'Bind list/form state to service layer.',
        'Integrate API contracts and validation rules.',
      ]
  );
}
