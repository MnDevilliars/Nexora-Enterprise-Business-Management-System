import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-products',
  imports: [ModulePlaceholderComponent],
  template: `
    <app-module-placeholder
      title="Products"
      subtitle="Catalog & Category Management"
      icon="inventory_2"
      description="This lazy-loaded module will manage product SKUs, hierarchical categories, active catalog status, and monetary pricing."
      plannedScope="Categories & Product Catalog"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {}

