import { IsString, MaxLength } from "class-validator";
export class CreateReelDto {
  @IsString() @MaxLength(120) title: string;
  @IsString() @MaxLength(280) description: string;
  @IsString() src: string;
  @IsString() creator: string;
}
