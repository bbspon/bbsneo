import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { Listing, ListingDocument } from "./schemas/listing.schema"
import { CreateListingDto } from "./dto/create-listing.dto";
import { UpdateListingDto } from "./dto/update-listing.dto";

@Injectable()
export class MarketplaceService {
  constructor(
    @InjectModel(Listing.name) private model: Model<ListingDocument>
  ) {}

  async create(dto: CreateListingDto, userId: string) {
    const doc = await this.model.create({
      ...dto,
      createdBy: new Types.ObjectId(userId),
    });
    return this.toPublic(doc);
  }

  async findAll(params: {
    q?: string;
    category?: string;
    location?: string;
    verified?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    limit?: string;
  }) {
    const {
      q,
      category,
      location,
      verified,
      minPrice,
      maxPrice,
      page = "1",
      limit = "24",
    } = params;

    const filter: FilterQuery<ListingDocument> = {};
    if (q)
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { sellerName: { $regex: q, $options: "i" } },
      ];
    if (category && category !== "All") filter.category = category;
    if (location && location !== "All India") filter.location = location;
    if (verified === "true") filter.verifiedSeller = true;
    if (minPrice)
      filter.price = { ...(filter.price || {}), $gte: Number(minPrice) };
    if (maxPrice)
      filter.price = { ...(filter.price || {}), $lte: Number(maxPrice) };

    const pageN = Math.max(1, Number(page));
    const limitN = Math.min(100, Math.max(1, Number(limit)));

    const [items, count] = await Promise.all([
      this.model
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((pageN - 1) * limitN)
        .limit(limitN)
        .lean(),
      this.model.countDocuments(filter),
    ]);

    return {
      items: items.map(this.toPublicLean),
      page: pageN,
      pages: Math.ceil(count / limitN),
      total: count,
    };
  }

  async findOne(id: string) {
    const doc = await this.model.findById(id);
    if (!doc) throw new NotFoundException("Listing not found");
    await this.model.updateOne({ _id: doc._id }, { $inc: { views: 1 } });
    return this.toPublic(doc);
  }

  async update(id: string, dto: UpdateListingDto) {
    const doc = await this.model.findByIdAndUpdate(
      id,
      { $set: dto },
      { new: true }
    );
    if (!doc) throw new NotFoundException("Listing not found");
    return this.toPublic(doc);
  }

  async remove(id: string) {
    const res = await this.model.findByIdAndDelete(id);
    if (!res) throw new NotFoundException("Listing not found");
    return { ok: true };
  }

  // favourites toggle
  async toggleFavourite(id: string, userId: string) {
    const _id = new Types.ObjectId(userId);
    const doc = await this.model.findById(id);
    if (!doc) throw new NotFoundException("Listing not found");
    const has = (doc.favouriteBy || []).some((v) => v.equals(_id));
    await this.model.updateOne(
      { _id: doc._id },
      has
        ? { $pull: { favouriteBy: _id } }
        : { $addToSet: { favouriteBy: _id } }
    );
    return { ok: true, favourite: !has };
  }

  private toPublic(doc: ListingDocument) {
    return this.toPublicLean(doc.toObject());
  }
  private toPublicLean = (d: any) => {
  // accept legacy and new shapes
  const image =
    (Array.isArray(d.images) && d.images.length ? d.images[0] : null) ||
    d.image ||
    "";

  const images =
    Array.isArray(d.images) && d.images.length
      ? d.images
      : d.image
      ? [d.image]
      : [];

  const seller = d.sellerName || d.seller || "";

  const verified =
    typeof d.verifiedSeller === "boolean"
      ? d.verifiedSeller
      : !!d.verified;

  return {
    id: d._id?.toString?.() ?? d._id,
    title: d.title,
    category: d.category,
    price: d.price,
    location: d.location,
    seller,
    verified,
    image,
    images,
    description: d.description || "",
    rating: d.rating ?? 0,
    likes: d.likes ?? 0,
    condition: d.condition || "Used",
    status: d.status || "Active",
    views: d.views ?? 0,
    favouriteBy: (d.favouriteBy || []).map((x: any) => x?.toString?.() ?? String(x)),
    createdAt: d.createdAt ?? d.created_at ?? null,
    updatedAt: d.updatedAt ?? d.updated_at ?? null,
  };
};

}
