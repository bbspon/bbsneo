import { IsString, MaxLength } from "class-validator";
export class CreateCommentDto {
  @IsString() user: string;
  @IsString() @MaxLength(280) text: string;
}
