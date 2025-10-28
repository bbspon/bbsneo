import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, FilterQuery } from "mongoose";
import { LiveChannel } from "../schemas/live-channel.schema";
import { CreateLiveDto } from "./dto/create-live.dto";
import { UpdateLiveDto } from "./dto/update-live.dto";

@Injectable()
export class LiveService {
  constructor(
    @InjectModel(LiveChannel.name) private model: Model<LiveChannel>
  ) {}

  async create(dto: CreateLiveDto) {
    return this.model.create(dto);
  }

  async findAll(params: {
    q?: string;
    category?: string;
    lang?: string;
    premium?: string;
    limit?: string;
    page?: string;
  }) {
    const { q, category, lang, premium, limit = "24", page = "1" } = params;
    const filter: FilterQuery<LiveChannel> = {};
    if (category && category !== "All") filter.category = category;
    if (lang && lang !== "All") filter.language = lang;
    if (premium === "true") filter.isPremium = true;
    if (q) filter.$text = { $search: q };

    const lim = Math.min(parseInt(limit, 10) || 24, 100);
    const skip = (Math.max(parseInt(page, 10) || 1, 1) - 1) * lim;

    const [items, total] = await Promise.all([
      this.model
        .find(filter)
        .sort({ isPremium: -1, viewerCount: -1 })
        .skip(skip)
        .limit(lim)
        .lean(),
      this.model.countDocuments(filter),
    ]);

    return { total, items };
  }

  async findOneBySlug(slug: string) {
    const doc = await this.model.findOne({ slug }).lean();
    if (!doc) throw new NotFoundException("Channel not found");
    return doc;
  }

  async update(id: string, dto: UpdateLiveDto) {
    const doc = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .lean();
    if (!doc) throw new NotFoundException("Channel not found");
    return doc;
  }

  async remove(id: string) {
    const doc = await this.model.findByIdAndDelete(id).lean();
    if (!doc) throw new NotFoundException("Channel not found");
    return { ok: true };
  }
}
