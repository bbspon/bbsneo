import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, FilterQuery, UpdateQuery } from "mongoose";
import { YStudioVideo, YStudioVideoDocument } from "./schemas/ystudio-video.schema";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";

@Injectable()
export class YStudioService {
  constructor(
    @InjectModel(YStudioVideo.name)
    private videoModel: Model<YStudioVideoDocument>
  ) {}

  async list(params: {
    q?: string;
    category?: string;
    visibility?: string;
    limit?: number;
    page?: number;
  }) {
    const { q, category, visibility, limit = 20, page = 1 } = params;
    const filter: FilterQuery<YStudioVideoDocument> = {};
    if (q) filter.title = { $regex: q, $options: "i" };
    if (category) filter.category = category;
    if (visibility) filter.visibility = visibility as any;

    const cursor = this.videoModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const [items, total] = await Promise.all([
      cursor.exec(),
      this.videoModel.countDocuments(filter),
    ]);
    return { items, total, page, limit };
  }

  async findById(id: string) {
    const doc = await this.videoModel.findById(id);
    if (!doc) throw new NotFoundException("Video not found");
    return doc;
  }

  async create(dto: CreateVideoDto, ownerId?: string) {
    const doc = new this.videoModel({ ...dto, ownerId });
    return doc.save();
  }

  async update(id: string, dto: UpdateVideoDto) {
    const updated = await this.videoModel.findByIdAndUpdate(
      id,
      dto as UpdateQuery<YStudioVideo>,
      { new: true }
    );
    if (!updated) throw new NotFoundException("Video not found");
    return updated;
  }

  async remove(id: string) {
    const res = await this.videoModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException("Video not found");
    return { deleted: true };
  }

  async incrementView(id: string) {
    const updated = await this.videoModel.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!updated) throw new NotFoundException("Video not found");
    return { views: updated.views };
  }

  async incrementLike(id: string) {
    const updated = await this.videoModel.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!updated) throw new NotFoundException("Video not found");
    return { likes: updated.likes };
  }
}
