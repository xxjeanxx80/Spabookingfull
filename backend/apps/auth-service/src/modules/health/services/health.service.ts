import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getStatus() {
    return {
      status: 'ok',
      service: process.env.SERVICE_NAME || 'auth-service',
      timestamp: new Date().toISOString(),
    };
  }
}
