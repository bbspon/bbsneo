import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Trending } from "./trending.schema";
import { CreateTrendingDto } from "./dto/create-trending.dto";

@Injectable()
export class TrendingService {
  constructor(@InjectModel(Trending.name) private model: Model<Trending>) {}

  async findAll(): Promise<Trending[]> {
    return this.model.find().sort({ createdAt: -1 }).lean();
  }

  async findByCategory(category: string): Promise<Trending[]> {
    return this.model.find({ category }).sort({ createdAt: -1 }).lean();
  }

  async create(dto: CreateTrendingDto): Promise<Trending> {
    return this.model.create(dto);
  }

  async update(id: string, dto: Partial<CreateTrendingDto>): Promise<Trending> {
    const updated = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException("Trending item not found");
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.model.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException("Trending item not found");
    return { message: "Deleted successfully" };
  }
}
