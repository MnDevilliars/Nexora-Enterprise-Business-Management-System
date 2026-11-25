import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

function extractClientSafeMessage(error: HttpErrorResponse): string {
  if (error.status === 0) {
    return 'Unable to reach the Nexora API server.';
  }
  if (error.status >= 500) {
    return 'A server error occurred. Please try again later.';
  }
  if (
    typeof error.error === 'object' &&
    error.error !== null &&
    'message' in error.error &&
    typeof (error.error as { message?: unknown }).message === 'string' &&
    (error.error as { message: string }).message.trim().length > 0
  ) {
    return (error.error as { message: string }).message;
  }
  return `Request failed with status ${error.status}.`;
}

/**
 * Normalizes HTTP errors into consistent error objects without exposing sensitive payload data.
 */
export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error(extractClientSafeMessage(error)));
    })
  );
};
