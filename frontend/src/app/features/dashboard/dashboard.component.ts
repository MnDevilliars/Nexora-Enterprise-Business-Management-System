import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ApiConfigService } from '../../core/services/api-config.service';

interface ModuleOverviewCard {
  title: string;
  route: string;
  icon: string;
  summary: string;
  status: string;
}

/**
 * Enterprise dashboard landing page showing Nexora platform setup and planned modules.
 */
@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  template: `
    <div class="dashboard-page">
      <header class="page-header">
        <div>
          <h1 class="page-title">Operations Dashboard</h1>
          <p class="page-subtitle">
            Nexora Enterprise Business Management System — Phase 1 Foundation
          </p>
        </div>
      </header>

      <section class="summary-grid" aria-label="Platform foundation status">
        <mat-card appearance="outlined" class="info-card">
          <mat-card-header>
            <mat-icon mat-card-avatar class="status-icon">dns</mat-icon>
            <mat-card-title>API Target</mat-card-title>
            <mat-card-subtitle>Centralized frontend configuration</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <code class="endpoint-value">{{ apiConfig.baseUrl }}</code>
          </mat-card-content>
        </mat-card>

        <mat-card appearance="outlined" class="info-card">
          <mat-card-header>
            <mat-icon mat-card-avatar class="status-icon">verified_user</mat-icon>
            <mat-card-title>Security Architecture</mat-card-title>
            <mat-card-subtitle>Stateless JWT &amp; RBAC planned</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p class="card-note">
              Backend enforces deny-by-default security; login and role guards arrive in Phase 2.
            </p>
          </mat-card-content>
        </mat-card>

        <mat-card appearance="outlined" class="info-card">
          <mat-card-header>
            <mat-icon mat-card-avatar class="status-icon">storage</mat-icon>
            <mat-card-title>Database &amp; Migrations</mat-card-title>
            <mat-card-subtitle>PostgreSQL + Flyway</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p class="card-note">
              Versioned schema management active with baseline migration and multi-tenant isolation plan.
            </p>
          </mat-card-content>
        </mat-card>
      </section>

      <section class="modules-section">
        <h2 class="section-title">Business Modules</h2>
        <div class="modules-grid">
          @for (module of modules; track module.route) {
            <mat-card appearance="outlined" class="module-card">
              <mat-card-header>
                <mat-icon mat-card-avatar class="module-avatar">{{ module.icon }}</mat-icon>
                <mat-card-title>{{ module.title }}</mat-card-title>
                <mat-card-subtitle>{{ module.status }}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p class="card-note">{{ module.summary }}</p>
              </mat-card-content>
              <mat-card-actions align="end">
                <a mat-button color="primary" [routerLink]="module.route">
                  Open Module
                  <mat-icon iconPositionEnd>arrow_forward</mat-icon>
                </a>
              </mat-card-actions>
            </mat-card>
          }
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .dashboard-page {
        display: flex;
        flex-direction: column;
        gap: 24px;
        max-width: 1280px;
      }

      .page-title {
        margin: 0;
        font-size: 1.6rem;
        font-weight: 600;
        color: #0f172a;
      }

      .page-subtitle {
        margin: 4px 0 0;
        color: #64748b;
        font-size: 0.95rem;
      }

      .summary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 16px;
      }

      .section-title {
        margin: 0 0 12px;
        font-size: 1.1rem;
        font-weight: 600;
        color: #1e293b;
      }

      .modules-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 16px;
      }

      .status-icon,
      .module-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 8px;
        background-color: #eff6ff;
        color: #1d4ed8;
      }

      .endpoint-value {
        display: inline-block;
        margin-top: 8px;
        padding: 4px 8px;
        border-radius: 4px;
        background-color: #f1f5f9;
        color: #0f172a;
        font-size: 0.85rem;
      }

      .card-note {
        margin: 8px 0 0;
        color: #475569;
        font-size: 0.9rem;
        line-height: 1.5;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  readonly apiConfig = inject(ApiConfigService);

  readonly modules: ModuleOverviewCard[] = [
    {
      title: 'Customers',
      route: '/customers',
      icon: 'people',
      status: 'Placeholder Ready',
      summary: 'Organization-scoped customer profiles, contacts, and billing/shipping addresses.'
    },
    {
      title: 'Products',
      route: '/products',
      icon: 'inventory_2',
      status: 'Placeholder Ready',
      summary: 'SKU catalog, categories, and DECIMAL-precision pricing definitions.'
    },
    {
      title: 'Inventory',
      route: '/inventory',
      icon: 'warehouse',
      status: 'Placeholder Ready',
      summary: 'Multi-warehouse stock levels, reservations, and immutable stock movement ledger.'
    },
    {
      title: 'Orders',
      route: '/orders',
      icon: 'shopping_cart',
      status: 'Placeholder Ready',
      summary: 'Order creation, line items, status lifecycle, and history tracking.'
    },
    {
      title: 'Payments',
      route: '/payments',
      icon: 'payments',
      status: 'Placeholder Ready',
      summary: 'Idempotent sandbox payment flows, verified webhooks, refunds, and invoices.'
    }
  ];
}

