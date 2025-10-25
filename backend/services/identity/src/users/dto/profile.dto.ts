import {
  IsArray,
  IsOptional,
  IsString,
  IsBoolean,
  MaxLength,
  ValidateNested,
} from "class-validator";

import { Type } from "class-transformer";

class ProfileItemDto {
  @IsString()
  @MaxLength(40)
  name?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsBoolean()
  isChild?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(4)
  pin?: string;

  @IsOptional()
  @IsString()
  language?: string;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  fullName?: string;

  @IsOptional()
  @IsString()
  subscriptionPlan?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProfileItemDto)
  profiles?: ProfileItemDto[];
}
