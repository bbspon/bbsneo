import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Otp, OtpDocument } from '../../domain/schemas/otp.schema';
import { User, UserDocument } from '../profile/user.schema';
import { sendMail } from '../../common/utils/mailer';
import * as nodemailer from 'nodemailer';

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

@Injectable()
export class MfaService {
     private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(Otp.name) private otpModel: Model<OtpDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async sendOtp(email: string, userId?: string) {
   const emailNorm = email.trim().toLowerCase();
const user = await this.userModel
  .findOne({ email: emailNorm })
  .collation({ locale: 'en', strength: 2 }) // case-insensitive safety
  .lean();
if (!user) throw new NotFoundException('User not found for OTP');


    const code = generateCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    await this.otpModel.create({
      userId: new Types.ObjectId(user._id),
      email: email.toLowerCase(),
      code,
      expiresAt,
      channel: 'email',
    });

    await sendMail(
      email,
      'Your BBS NEO verification code',
      `<div style="font-family:Arial,sans-serif">
        <h2>BBS NEO OTP</h2>
        <p>Your verification code is:</p>
        <p style="font-size:24px;letter-spacing:4px;"><b>${code}</b></p>
        <p>This code will expire in 5 minutes.</p>
      </div>`
    );

    return { ok: true, message: 'OTP sent to email' };
  }

  async verifyOtp(email: string, code: string) {
    const now = new Date();
    const otp = await this.otpModel.findOne({
      email: email.toLowerCase(),
      code,
      used: false,
      expiresAt: { $gte: now },
    });

    if (!otp) {
      throw new BadRequestException('Invalid or expired code');
    }

    otp.used = true;
    await otp.save();

    return { ok: true, message: 'OTP verified' };
  }
}
