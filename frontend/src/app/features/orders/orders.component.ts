import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-orders',
  imports: [ModulePlaceholderComponent],
  template: `
    <app-module-placeholder
      title="Orders"
      subtitle="Order Lifecycle & Fulfillment"
      icon="shopping_cart"
      description="This lazy-loaded module will manage customer orders, line-item totals, inventory reservations, and status history."
      plannedScope="Order Processing & History"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent {}

