# Nexora Frontend

Angular 19 + Angular Material Single Page Application for **Nexora – Enterprise Business Management System**.

## Technology Stack

- **Angular**: 19.2.x (Standalone Components, Lazy-loaded Routes, Signals)
- **UI Framework**: Angular Material 19.2.x + Angular CDK
- **Language**: TypeScript 5.7.x (strict mode + strict Angular templates)
- **Testing**: Jasmine & Karma (`ChromeHeadless`)

## Structure (`src/app/`)

- `core/`: Singleton services (`ApiConfigService`), HTTP interceptors (`httpErrorInterceptor`), models, and Phase 2 auth/guard slots.
- `shared/`: Reusable UI components (`ModulePlaceholderComponent`), pipes, and directives.
- `layout/`: Responsive enterprise shell (`ShellComponent`, `HeaderComponent`, `SidebarComponent`, `FooterComponent`).
- `features/`: Lazy-loaded feature views (`dashboard`, `customers`, `products`, `inventory`, `orders`, `payments`).

## Commands

> Note: Ensure Node.js `v20.11+` (or `v18.19+`) is active (e.g. `nvm use 20.18.0`).

```bash
# Install dependencies
npm install

# Start development server (http://localhost:4200)
npm start

# Production build
npm run build

# Run unit tests once in headless Chrome
npx ng test --watch=false --browsers=ChromeHeadless
```
