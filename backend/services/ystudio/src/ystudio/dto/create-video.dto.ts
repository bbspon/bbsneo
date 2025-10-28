import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from "class-validator";

export class CreateVideoDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUrl()
  videoUrl: string;

  @IsUrl()
  thumbnail: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsArray()
  readonly tags?: string[];

  @IsOptional()
  @IsIn(["public", "private", "unlisted"])
  visibility?: "public" | "private" | "unlisted";
}
