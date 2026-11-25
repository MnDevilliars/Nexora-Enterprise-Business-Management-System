import { TestBed } from '@angular/core/testing';
import { ApiConfigService } from './api-config.service';

describe('ApiConfigService', () => {
  let service: ApiConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConfigService);
  });

  it('should normalize endpoint paths against the configured base URL', () => {
    expect(service.endpoint('customers')).toBe(`${service.baseUrl}/customers`);
    expect(service.endpoint('/orders')).toBe(`${service.baseUrl}/orders`);
  });
});

