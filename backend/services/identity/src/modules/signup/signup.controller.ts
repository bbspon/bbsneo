import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { SignupDto } from './signup.dto';
import { SignupService } from './signup.service';

@Controller('/auth')
export class SignupController {
  constructor(private readonly service: SignupService) {}

  @Post('/signup')
  async signup(@Body() dto: SignupDto) {
    try {
      return await this.service.signup(dto);
    } catch (err: any) {
      console.error('[signup] error:', err);

      // Duplicate key (Mongo)
      if (err?.code === 11000 && err?.keyPattern?.email) {
        throw new ConflictException('Email already registered');
      }
      if (err?.code === 11000 && err?.keyPattern?.phone) {
        throw new ConflictException('Phone already registered');
      }

      // Validation surfaced as plain error
      if (err?.name === 'ValidationError') {
        throw new BadRequestException(err.message);
      }

      // JWT/crypto/env config missing
      if (String(err?.message || '').includes('secret')) {
        throw new InternalServerErrorException('Server auth config missing');
      }

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
