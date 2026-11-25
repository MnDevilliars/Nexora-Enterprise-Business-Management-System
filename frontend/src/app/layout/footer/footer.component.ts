import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Minimal enterprise footer displaying application context.
 */
@Component({
  selector: 'app-footer',
  template: `
    <footer class="app-footer">
      <span>Nexora Enterprise Business Management System</span>
      <span>Phase 1 Foundation</span>
    </footer>
  `,
  styles: [
    `
      .app-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        padding: 12px 24px;
        border-top: 1px solid #e2e8f0;
        background-color: #ffffff;
        color: #64748b;
        font-size: 0.8rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {}

