import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Centralizes backend REST API base URL configuration.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  readonly baseUrl: string = environment.apiBaseUrl;
  readonly isProduction: boolean = environment.production;

  endpoint(path: string): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseUrl}${normalizedPath}`;
  }
}

