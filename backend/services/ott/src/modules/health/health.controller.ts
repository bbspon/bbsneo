import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('/')
  root() {
    return { ok: true, service: 'identity' };
  }

  @Get('/healthz')
  health() {
    return { status: 'ok' };
  }
}


