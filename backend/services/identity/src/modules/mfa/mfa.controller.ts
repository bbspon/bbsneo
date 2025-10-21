import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MfaService } from './mfa.service';
import { SendOtpDto, VerifyOtpDto } from './mfa.dto';

@Controller('auth/mfa')
export class MfaController {
  constructor(private readonly mfaService: MfaService) {}

  @Post('send')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
   async send(@Body('email') email: string) {
    return this.mfaService.sendOtp(email);
  }

  @Post('verify')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async verify(@Body('email') email: string, @Body('code') code: string) {
    return this.mfaService.verifyOtp(email, code);
  }
}
