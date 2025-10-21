import { IsEmail, IsMongoId, IsOptional, IsString, Length } from 'class-validator';

export class SendOtpDto {
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsMongoId()
  userId?: string;
}

export class VerifyOtpDto {
  @IsEmail()
  email!: string;

  @IsString()
  @Length(6, 6)
  code!: string;
}
