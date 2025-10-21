import { IsEmail, IsOptional, IsString, MinLength, Matches } from 'class-validator';
import { Match } from './utils/match.decorator';

export class SignupDto {
  @IsString()
  @MinLength(2)
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?[0-9]{10,15}$/) // digits, optional +
  phone?: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).+$/, {
    message: 'Password must include upper, lower, number, special',
  })
  password!: string;

  @IsString()
  @MinLength(8)
  @Match('password', { message: 'confirmPassword must match password' })
  confirmPassword!: string;
}
