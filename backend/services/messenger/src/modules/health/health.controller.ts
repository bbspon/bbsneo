import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealthController {
  @Get()
  health() {
    return { service: 'messenger', status: 'ok' };
  }
}