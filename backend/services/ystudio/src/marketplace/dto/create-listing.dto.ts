// create-listing.dto.ts
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
  Max,
} from "class-validator";

export class CreateListingDto {
  @IsString() @Length(3, 150) title: string;
  @IsString() category: string;
  @IsNumber() @Min(1) price: number;
  @IsString() location: string;
  @IsString() sellerName: string;
  @IsBoolean() @IsOptional() verifiedSeller?: boolean = false;
  @IsArray() images: string[];
  @IsString() @IsOptional() description?: string = "";
  @IsNumber() @Min(0) @Max(5) @IsOptional() rating?: number = 0;
  @IsNumber() @IsOptional() likes?: number = 0;
  @IsString() @IsOptional() condition?: "New" | "Used" | "Refurbished" = "Used";
  @IsString() @IsOptional() status?: "Active" | "Sold" | "Pending" = "Active";
}
