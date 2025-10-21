import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('email/register')
  register(@Body() body: any) {
    const { email, password, displayName } = body || {};
    if (!email || !password) {
      return { error: 'email and password are required' };
    }
    return this.service.register(String(email), String(password), displayName ? String(displayName) : undefined);
  }

  @Post('email/login')
  login(@Body() body: any) {
    const { email, password } = body || {};
    if (!email || !password) {
      return { error: 'email and password are required' };
    }
    return this.service.login(String(email), String(password));
  }

  @Post('token/refresh')
  refresh(@Body('refreshToken') refreshToken: string) {
    return this.service.refresh(String(refreshToken || ''));
  }

  @Post('logout')
  logout(@Body('userId') userId: string) {
    return this.service.logout(String(userId || ''));
  }
}
