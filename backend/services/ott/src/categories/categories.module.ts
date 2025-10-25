import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { CategorySection, CategorySectionSchema } from "./categories.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategorySection.name, schema: CategorySectionSchema },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
