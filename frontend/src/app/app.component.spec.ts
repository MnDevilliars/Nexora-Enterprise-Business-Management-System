import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { ShellComponent } from './layout/shell/shell.component';

describe('AppComponent & Shell Layout', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ShellComponent],
      providers: [provideRouter(routes), provideNoopAnimations()]
    }).compileComponents();
  });

  it('should create the root application component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render Nexora shell with all planned business module links', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const text = compiled.textContent ?? '';
    expect(text).toContain('Nexora');
    expect(text).toContain('Dashboard');
    expect(text).toContain('Customers');
    expect(text).toContain('Products');
    expect(text).toContain('Inventory');
    expect(text).toContain('Orders');
    expect(text).toContain('Payments');
  });
});
