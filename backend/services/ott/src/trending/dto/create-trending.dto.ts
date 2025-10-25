import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateTrendingDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  title: string;

  @IsString()
  creatorName: string;

  @IsOptional()
  @IsString()
  creatorHandle?: string;

  @IsEnum(["Travel", "Tech", "Music", "Gaming", "Education"])
  category: string;

  @IsString()
  thumbnailUrl: string;

  @IsNumber()
  viewsCount: number;

  @IsNumber()
  likesCount: number;
}
