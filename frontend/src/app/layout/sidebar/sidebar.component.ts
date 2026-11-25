import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from '../../core/models/navigation.model';

/**
 * Primary sidebar navigation for Nexora business modules.
 */
@Component({
  selector: 'app-sidebar',
  imports: [MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  template: `
    <div class="sidebar-wrapper">
      <div class="sidebar-brand">
        <mat-icon class="logo-icon">hub</mat-icon>
        <div>
          <div class="logo-name">NEXORA</div>
          <div class="logo-caption">Business Suite</div>
        </div>
      </div>

      <mat-nav-list aria-label="Primary modules">
        @for (item of navItems(); track item.route) {
          <a
            mat-list-item
            [routerLink]="item.route"
            routerLinkActive="active-link"
            (click)="navigate.emit()"
          >
            <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
            <span matListItemTitle>{{ item.label }}</span>
          </a>
        }
      </mat-nav-list>
    </div>
  `,
  styles: [
    `
      .sidebar-wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #0f172a;
        color: #e2e8f0;
      }

      .sidebar-brand {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 18px 20px;
        border-bottom: 1px solid #1e293b;
      }

      .logo-icon {
        color: #60a5fa;
        font-size: 28px;
        width: 28px;
        height: 28px;
      }

      .logo-name {
        font-size: 1rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        color: #f8fafc;
      }

      .logo-caption {
        font-size: 0.72rem;
        color: #94a3b8;
      }

      mat-nav-list {
        padding-top: 8px;
      }

      a[mat-list-item] {
        color: #cbd5e1;
        margin: 2px 8px;
        border-radius: 8px;
      }

      a[mat-list-item] mat-icon {
        color: #94a3b8;
      }

      a.active-link {
        background-color: #1e293b;
        color: #ffffff;
      }

      a.active-link mat-icon {
        color: #60a5fa;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  readonly navItems = input.required<NavItem[]>();
  readonly navigate = output<void>();
}

