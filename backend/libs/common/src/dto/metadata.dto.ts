import { ApiResponse } from './api-response.dto';

export interface HealthCheckResponse extends ApiResponse<{ status: string }> {}

export interface ServiceInfo {
  name: string;
  version: string;
  description?: string;
}
