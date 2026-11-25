import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { NavItem } from '../../core/models/navigation.model';
import { ApiConfigService } from '../../core/services/api-config.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

/**
 * Responsive application shell combining sidebar navigation, header, workspace outlet, and footer.
 */
@Component({
  selector: 'app-shell',
  imports: [
    MatSidenavModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  template: `
    <mat-sidenav-container class="shell-container">
      <mat-sidenav
        class="shell-sidenav"
        [mode]="isHandset() ? 'over' : 'side'"
        [opened]="sidenavOpened()"
        (closedStart)="mobileOpen.set(false)"
      >
        <app-sidebar [navItems]="navItems" (navigate)="onNavigate()" />
      </mat-sidenav>

      <mat-sidenav-content class="shell-content">
        <app-header
          [environmentLabel]="environmentLabel()"
          (menuToggle)="toggleSidenav()"
        />

        <main class="main-workspace">
          <router-outlet />
        </main>

        <app-footer />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .shell-container {
        height: 100vh;
      }

      .shell-sidenav {
        width: 248px;
        border-right: none;
      }

      .shell-content {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background-color: #f5f7fa;
      }

      .main-workspace {
        flex: 1 1 auto;
        padding: 24px;
      }

      @media (max-width: 600px) {
        .main-workspace {
          padding: 16px;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly apiConfig = inject(ApiConfigService);

  readonly isHandset = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .pipe(map((result) => result.matches)),
    { initialValue: false }
  );

  readonly desktopOpen = signal(true);
  readonly mobileOpen = signal(false);

  readonly sidenavOpened = computed(() =>
    this.isHandset() ? this.mobileOpen() : this.desktopOpen()
  );

  readonly environmentLabel = computed(() =>
    this.apiConfig.isProduction ? 'Production' : 'Development'
  );

  readonly navItems: NavItem[] = [
    {
      label: 'Dashboard',
      route: '/dashboard',
      icon: 'dashboard',
      description: 'Platform overview and module readiness'
    },
    {
      label: 'Customers',
      route: '/customers',
      icon: 'people',
      description: 'Customer accounts and addresses'
    },
    {
      label: 'Products',
      route: '/products',
      icon: 'inventory_2',
      description: 'Product catalog and categories'
    },
    {
      label: 'Inventory',
      route: '/inventory',
      icon: 'warehouse',
      description: 'Warehouse stock and movement ledger'
    },
    {
      label: 'Orders',
      route: '/orders',
      icon: 'shopping_cart',
      description: 'Order processing and fulfillment'
    },
    {
      label: 'Payments',
      route: '/payments',
      icon: 'payments',
      description: 'Payment transactions, refunds, and invoices'
    }
  ];

  toggleSidenav(): void {
    if (this.isHandset()) {
      this.mobileOpen.update((open) => !open);
    } else {
      this.desktopOpen.update((open) => !open);
    }
  }

  onNavigate(): void {
    if (this.isHandset()) {
      this.mobileOpen.set(false);
    }
  }
}

