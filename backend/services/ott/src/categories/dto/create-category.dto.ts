import {
  IsArray,
  IsNotEmpty,
  IsString,
  ArrayNotEmpty,
  ArrayUnique,
} from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  posters: string[];
}
