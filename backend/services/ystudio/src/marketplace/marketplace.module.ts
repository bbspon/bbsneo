import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Listing, ListingSchema } from "./schemas/listing.schema";
import { MarketplaceService } from "./marketplace.service";
import { MarketplaceController } from "./marketplace.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Listing.name, schema: ListingSchema }]),
  ],
  controllers: [MarketplaceController],
  providers: [MarketplaceService],
})
export class MarketplaceModule {}
