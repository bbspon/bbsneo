import { IsEmail, IsIn, IsNotEmpty, Matches } from "class-validator";

export class SignupDto {
  @IsNotEmpty({ message: "fullName is required" })
  @Matches(/^[A-Za-z ]{2,}$/, {
    message: "fullName must be letters/spaces, min 2 chars",
  })
  fullName: string;

  @IsEmail({}, { message: "email is invalid" })
  email: string;

  @IsNotEmpty({ message: "phoneNumber is required" })
  @Matches(/^(\+)?[0-9]{10,15}$/, {
    message: "phoneNumber must be 10-15 digits (optional +cc)",
  })
  phoneNumber: string;

  @IsNotEmpty({ message: "password is required" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
    message: "password must be 8+ chars incl. upper, lower, digit, special",
  })
  password: string;

  @IsIn(["Manual", "Google", "Apple"])
  signUpMethod: "Manual" | "Google" | "Apple" = "Manual";
}
