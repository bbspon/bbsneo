import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealthController {
  @Get()
  health() {
    return { service: 'wallet', status: 'ok' };
  }
}