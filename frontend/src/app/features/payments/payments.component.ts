import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-payments',
  imports: [ModulePlaceholderComponent],
  template: `
    <app-module-placeholder
      title="Payments"
      subtitle="Transactions, Refunds & Invoices"
      icon="payments"
      description="This lazy-loaded module will support idempotent sandbox payment processing, webhook-verified statuses, refunds, and invoices."
      plannedScope="Payments & Invoicing"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsComponent {}

