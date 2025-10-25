import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from "@nestjs/common";
import { ReelsService } from "./reels.service";
import { CreateReelDto } from "./dto/create-reel.dto";
import { UpdateReelDto } from "./dto/update-reel.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CreateReplyDto } from "./dto/create-reply.dto";

@Controller("reels")
export class ReelsController {
  constructor(private readonly service: ReelsService) {}

  @Get()
  list(@Query("limit") limit = "10", @Query("skip") skip = "0") {
    return this.service.list(Number(limit), Number(skip));
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.service.get(id);
  }

  @Post()
  create(@Body() dto: CreateReelDto) {
    return this.service.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateReelDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }

  // social actions
  @Post(":id/like")
  like(@Param("id") id: string) {
    return this.service.like(id, 1);
  }

  @Post(":id/unlike")
  unlike(@Param("id") id: string) {
    return this.service.like(id, -1);
  }

  @Post(":id/share")
  share(@Param("id") id: string) {
    return this.service.share(id);
  }

  // comments
  @Post(":id/comments")
  addComment(@Param("id") id: string, @Body() dto: CreateCommentDto) {
    return this.service.addComment(id, dto);
  }

  @Post(":id/comments/:commentId/like")
  likeComment(@Param("id") id: string, @Param("commentId") commentId: string) {
    return this.service.likeComment(id, commentId);
  }

  @Post(":id/comments/:commentId/replies")
  addReply(
    @Param("id") id: string,
    @Param("commentId") commentId: string,
    @Body() dto: CreateReplyDto
  ) {
    return this.service.addReply(id, commentId, dto);
  }
}
