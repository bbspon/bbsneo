import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategorySection } from "./categories.schema";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(CategorySection.name)
    private sectionModel: Model<CategorySection>
  ) {}

  findAll() {
    return this.sectionModel.find({}).sort({ createdAt: -1 }).lean();
  }

  /** Return exactly what your UI expects: { [name]: string[] } */
  async asObject() {
    const rows = await this.findAll();
    const obj: Record<string, string[]> = {};
    for (const r of rows) obj[r.name] = r.posters || [];
    return obj;
  }

  create(dto: CreateCategoryDto) {
    return this.sectionModel.create(dto);
  }

  update(id: string, dto: UpdateCategoryDto) {
    return this.sectionModel.findByIdAndUpdate(id, dto, { new: true });
  }

  remove(id: string) {
    return this.sectionModel.findByIdAndDelete(id);
  }

  /** simple seed helper */
  async seedIfEmpty() {
    const count = await this.sectionModel.countDocuments();
    if (count > 0) return { seeded: false, count };

    await this.sectionModel.insertMany([
      {
        name: "Trending Now",
        posters: [
          "https://image.tmdb.org/t/p/w300/74xTEgt7R36Fpooo50r9T25onhq.jpg",
          "https://image.tmdb.org/t/p/w300/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        ],
      },
      {
        name: "Top 10 in India Today",
        posters: [
          "https://technosports.co.in/wp-content/uploads/2024/02/viduthalai-part-1-review-megathread-v0-coxush7vh0ra1-727x1024.webp",
          "https://3.bp.blogspot.com/-gHb2oBy0VfQ/Tq_6tPbGusI/AAAAAAAACas/Fdrq6SxppzA/s1600/Karikalan-Poster-Stills-004.jpg",
          "https://image.tmdb.org/t/p/w300/t7EUMSlfUN3jUSZUJOLURAzJzZs.jpg",
        ],
      },
    ]);
    return { seeded: true };
  }
}
