import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

/**
 * Top application bar providing navigation toggle and system identity.
 */
@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar class="app-header">
      <button
        mat-icon-button
        type="button"
        aria-label="Toggle navigation menu"
        (click)="menuToggle.emit()"
      >
        <mat-icon>menu</mat-icon>
      </button>

      <div class="brand-group">
        <span class="brand-title">Nexora</span>
        <span class="brand-subtitle">Enterprise Business Management</span>
      </div>

      <span class="spacer"></span>

      <span class="env-badge">{{ environmentLabel() }}</span>
    </mat-toolbar>
  `,
  styles: [
    `
      .app-header {
        background-color: #ffffff;
        border-bottom: 1px solid #e2e8f0;
        color: #0f172a;
        position: sticky;
        top: 0;
        z-index: 10;
      }

      .brand-group {
        display: flex;
        align-items: baseline;
        gap: 10px;
        margin-left: 8px;
      }

      .brand-title {
        font-size: 1.15rem;
        font-weight: 700;
        letter-spacing: 0.01em;
      }

      .brand-subtitle {
        font-size: 0.85rem;
        color: #64748b;
      }

      .spacer {
        flex: 1 1 auto;
      }

      .env-badge {
        font-size: 0.75rem;
        font-weight: 500;
        padding: 4px 10px;
        border-radius: 999px;
        background-color: #eff6ff;
        color: #1d4ed8;
        border: 1px solid #bfdbfe;
      }

      @media (max-width: 600px) {
        .brand-subtitle {
          display: none;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly environmentLabel = input<string>('Development');
  readonly menuToggle = output<void>();
}

