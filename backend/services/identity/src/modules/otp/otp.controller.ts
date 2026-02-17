import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller()
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send-otp')
  async send(@Body('phone') phone: string) {
    if (!phone) throw new BadRequestException('phone required');
    return this.otpService.sendOtp(phone);
  }

  @Post('verify-otp')
  async verify(@Body() body: { phone?: string; otp?: string }) {
    const { phone, otp } = body;
    if (!phone || !otp) throw new BadRequestException('phone and otp required');
    const ok = this.otpService.verifyOtp(phone, otp);
    if (!ok) {
      return { ok: false, error: 'Invalid OTP' };
    }
    return { ok: true };
  }
}
