import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";

import { YStudioVideo, YStudioVideoSchema } from "./schemas/ystudio-video.schema";
import { YStudioService } from "./ystudio.service";
import { YStudioController } from "./ystudio.controller";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: YStudioVideo.name, schema: YStudioVideoSchema },
    ]),
  ],
  controllers: [YStudioController],
  providers: [YStudioService],
  exports: [YStudioService],
})
export class YStudioModule {}
