import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// Use a loose type to avoid schema typing issues
type MovieDoc = Record<string, any>;

@Injectable()
export class HomeService {
  constructor(
    // IMPORTANT: keep this model name equal to your Movies schema name.
    // If your schema is registered as 'Movie', this is correct.
    @InjectModel("Movie") private readonly movieModel: Model<MovieDoc>
  ) {}

  /** Hero slides: top viewed / rated / recent */
  async hero() {
    const docs = await this.movieModel
      .find(
        {},
        {
          title: 1,
          img: 1, // << explicit selection from DB
          videoUrl: 1, // << explicit selection from DB
          category: 1,
          viewerCount: 1,
          rating: 1,
          createdAt: 1,
        }
      )
      .sort({ viewerCount: -1, rating: -1, createdAt: -1 })
      .limit(5)
      .lean();

    return docs.map((m) => ({
      title: m.title || "Untitled",
      subtitle: "Watch now",
      img: m.img || "",
      previewUrl: m.videoUrl || "",
    }));
  }

  /** Rows for Home: All + Action + Drama + Comedy */
  async rows() {
    const rows: Array<{ label: string; items: any[] }> = [];
    const genres = ["Action", "Drama", "Comedy"];

    // All (latest)
    const all = await this.movieModel
      .find(
        {},
        {
          title: 1,
          img: 1, // << explicit selection
          videoUrl: 1, // << explicit selection
          category: 1,
          createdAt: 1,
        }
      )
      .sort({ createdAt: -1 })
      .limit(18)
      .lean();

    rows.push({
      label: "All",
      items: all.map((m) => ({
        id: String(m._id),
        title: m.title || "Untitled",
        img: m.img || "",
        previewUrl: m.videoUrl || "",
        genre: m.category || "General",
      })),
    });

    // Specific genre rows
    for (const g of genres) {
      const list = await this.movieModel
        .find(
          { category: g },
          {
            title: 1,
            img: 1, // << explicit selection
            videoUrl: 1, // << explicit selection
            category: 1,
          }
        )
        .limit(18)
        .lean();

      rows.push({
        label: g,
        items: list.map((m) => ({
          id: String(m._id),
          title: m.title || "Untitled",
          img: m.img || "",
          previewUrl: m.videoUrl || "",
          genre: g,
        })),
      });
    }

    return rows;
  }

  /** Placeholder until you wire watch history */
  async continueWatching(_userId?: string) {
    return { items: [] };
  }
}
