import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

/**
 * Reusable placeholder view for business modules scheduled in upcoming phases.
 */
@Component({
  selector: 'app-module-placeholder',
  imports: [MatCardModule, MatChipsModule, MatIconModule],
  template: `
    <section class="placeholder-container">
      <mat-card appearance="outlined" class="placeholder-card">
        <mat-card-header>
          <mat-icon mat-card-avatar class="module-icon">{{ icon() }}</mat-icon>
          <mat-card-title>{{ title() }}</mat-card-title>
          <mat-card-subtitle>{{ subtitle() }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="description">{{ description() }}</p>
          <mat-chip-set aria-label="Module status">
            <mat-chip highlighted>Phase 1 Foundation Ready</mat-chip>
            <mat-chip>Planned: {{ plannedScope() }}</mat-chip>
          </mat-chip-set>
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .placeholder-container {
        max-width: 780px;
      }

      .placeholder-card {
        padding: 8px;
      }

      .module-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        background-color: #e8eef7;
        color: #1d4ed8;
        font-size: 24px;
        width: 40px;
        height: 40px;
      }

      .description {
        margin: 16px 0;
        color: #475569;
        line-height: 1.6;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModulePlaceholderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly description = input.required<string>();
  readonly icon = input<string>('widgets');
  readonly plannedScope = input.required<string>();
}

