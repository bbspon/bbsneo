import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsNumber,
  Max,
  Min,
} from "class-validator";

export class CreateLiveDto {
  @IsString() @IsNotEmpty() channelName: string;
  @IsString() @IsNotEmpty() slug: string;
  @IsEnum(["News", "Sports", "Kids", "Music", "Movies", "Regional"])
  category: string;

  @IsOptional() @IsString() language?: string;
  @IsUrl() thumbnailUrl: string;

  @IsOptional() @IsBoolean() isLive?: boolean;

  @IsOptional() @IsString() programTitle?: string;
  @IsOptional() @IsString() programDescription?: string;

  @IsOptional() @IsDateString() startTime?: string;
  @IsOptional() @IsDateString() endTime?: string;

  @IsOptional() @IsString() nextProgram?: string;

  @IsOptional() @IsNumber() viewerCount?: number;

  @IsOptional() @IsBoolean() isPremium?: boolean;

  @IsOptional() @IsNumber() @Min(0) @Max(5) rating?: number;

  @IsOptional() tags?: string[];

  @IsUrl() streamUrl: string;

  @IsOptional()
  @IsEnum(["Free", "Premium", "PayPerView"])
  subscriptionType?: string;
}
