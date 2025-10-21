import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealthController {
  @Get()
  health() {
    return { service: 'api-gateway', status: 'ok' };
  }
}