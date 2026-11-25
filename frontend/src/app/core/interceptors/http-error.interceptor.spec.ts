import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { httpErrorInterceptor } from './http-error.interceptor';

describe('httpErrorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([httpErrorInterceptor])),
        provideHttpClientTesting()
      ]
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should normalize backend 4xx error message', () => {
    let capturedMessage = '';

    http.get('/api/v1/probe').subscribe({
      error: (err: Error) => {
        capturedMessage = err.message;
      }
    });

    const req = httpMock.expectOne('/api/v1/probe');
    req.flush({ message: 'Validation failed' }, { status: 400, statusText: 'Bad Request' });

    expect(capturedMessage).toBe('Validation failed');
  });

  it('should mask raw 5xx error payloads with a generic client-safe message', () => {
    let capturedMessage = '';

    http.get('/api/v1/probe').subscribe({
      error: (err: Error) => {
        capturedMessage = err.message;
      }
    });

    const req = httpMock.expectOne('/api/v1/probe');
    req.flush({ message: 'Internal SQL trace leaked' }, { status: 500, statusText: 'Internal Server Error' });

    expect(capturedMessage).toBe('A server error occurred. Please try again later.');
  });

  it('should return a user-safe message on network failure', () => {
    let capturedMessage = '';

    http.get('/api/v1/probe').subscribe({
      error: (err: Error) => {
        capturedMessage = err.message;
      }
    });

    const req = httpMock.expectOne('/api/v1/probe');
    req.error(new ProgressEvent('error'));

    expect(capturedMessage).toBe('Unable to reach the Nexora API server.');
  });
});
