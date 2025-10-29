    import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
    import { HydratedDocument, Types } from "mongoose";

    @Schema({ timestamps: true, collection: "marketplace_listings" })
    export class Listing {
      _id: Types.ObjectId;

      @Prop({ required: true, minlength: 3, maxlength: 150 })
      title: string;

      @Prop({
        required: true,
        enum: [
          "Electronics",
          "Vehicles",
          "Furniture",
          "Fashion",
          "Books",
          "Toys",
          "Services",
        ],
      })
      category: string;

      @Prop({ required: true, min: 0 })
      price: number;

      @Prop({ required: true })
      location: string;

      @Prop({ required: true })
      sellerName: string;

      @Prop({ default: false })
      verifiedSeller: boolean;

      @Prop({
        type: [String],
        required: true,
        validate: (v: string[]) => v.length >= 1,
      })
      images: string[];

      @Prop({ default: "" })
      description: string;

      @Prop({ default: 0, min: 0, max: 5 })
      rating: number;

      @Prop({ default: 0 })
      likes: number;

      @Prop({ enum: ["New", "Used", "Refurbished"], default: "Used" })
      condition: string;

      @Prop({ enum: ["Active", "Sold", "Pending"], default: "Active" })
      status: string;

      @Prop({ default: 0 })
      views: number;

      @Prop({ type: [Types.ObjectId], ref: "users", default: [] })
      favouriteBy: Types.ObjectId[];

      @Prop({ type: Types.ObjectId, ref: "users" })
      createdBy: Types.ObjectId;
    }
    export type ListingDocument = HydratedDocument<Listing>;
    export const ListingSchema = SchemaFactory.createForClass(Listing);
