import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsEmail({}, { message: "email is invalid" })
  email: string;

  @IsNotEmpty({ message: "password is required" })
  password: string;
}
