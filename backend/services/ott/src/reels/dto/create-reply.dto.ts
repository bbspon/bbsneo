import { IsString, MaxLength } from "class-validator";
export class CreateReplyDto {
  @IsString() user: string;
  @IsString() @MaxLength(280) text: string;
}
