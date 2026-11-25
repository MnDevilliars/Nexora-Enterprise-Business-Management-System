/**
 * Standard API response envelope matching backend com.nexora.common.response.ApiResponse.
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors?: Record<string, string> | null;
  timestamp: string;
}

