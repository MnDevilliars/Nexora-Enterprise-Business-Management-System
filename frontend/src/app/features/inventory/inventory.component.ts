import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-inventory',
  imports: [ModulePlaceholderComponent],
  template: `
    <app-module-placeholder
      title="Inventory"
      subtitle="Warehouses & Stock Movements"
      icon="warehouse"
      description="This lazy-loaded module will track warehouse stock levels, reserved quantities, and audited stock movement history."
      plannedScope="Warehouses & Stock Ledger"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryComponent {}

