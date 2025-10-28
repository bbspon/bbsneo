import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LiveService } from "./live.service";
import { LiveController } from "./live.controller";
import { LiveChannel, LiveChannelSchema } from "../schemas/live-channel.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LiveChannel.name, schema: LiveChannelSchema },
    ]),
  ],
  controllers: [LiveController],
  providers: [LiveService],
})
export class LiveModule {}
