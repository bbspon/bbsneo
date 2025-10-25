import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Movie } from "./movies.schema";

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async findAll(query: any = {}): Promise<any[]> {
    const filter: any = {};
    if (query.genre && query.genre !== "All") filter.genre = query.genre;
    if (query.search) filter.title = { $regex: query.search, $options: "i" };
    const docs = await this.movieModel
      .find(filter)
      .sort({ popularityScore: -1, createdAt: -1 })
      .limit(100);
    return docs.map((d) => ({
      id: d._id,
      title: d.title,
      img: d.img,
      genre: d.genre,
    }));
  }

  async findOne(id: string): Promise<Movie | null> {
    return this.movieModel.findById(id);
  }

  async create(data: Partial<Movie>): Promise<Movie> {
    if (!data.slug && data.title)
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    const doc = new this.movieModel(data);
    return doc.save();
  }

  async update(id: string, data: Partial<Movie>): Promise<Movie | null> {
    return this.movieModel.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: string): Promise<void> {
    await this.movieModel.findByIdAndDelete(id);
  }
}
