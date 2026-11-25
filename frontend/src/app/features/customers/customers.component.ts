import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-customers',
  imports: [ModulePlaceholderComponent],
  template: `
    <app-module-placeholder
      title="Customers"
      subtitle="Customer Directory & Address Management"
      icon="people"
      description="This lazy-loaded module will manage organization-isolated customer records, contact details, and billing/shipping addresses."
      plannedScope="Customer CRUD & Addresses"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersComponent {}

