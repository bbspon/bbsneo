import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Reel } from "./reels.schema";
import { CreateReelDto } from "./dto/create-reel.dto";
import { UpdateReelDto } from "./dto/update-reel.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CreateReplyDto } from "./dto/create-reply.dto";

@Injectable()
export class ReelsService {
  constructor(@InjectModel(Reel.name) private model: Model<Reel>) {}

  async list(limit = 10, skip = 0) {
    return this.model
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
  }

  async get(id: string) {
    const reel = await this.model.findById(id).lean();
    if (!reel) throw new NotFoundException("Reel not found");
    return reel;
  }

  create(dto: CreateReelDto) {
    return this.model.create({ ...dto, likes: 0, shares: 0, comments: [] });
  }

  async update(id: string, dto: UpdateReelDto) {
    const updated = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .lean();
    if (!updated) throw new NotFoundException("Reel not found");
    return updated;
  }

  async remove(id: string) {
    const res = await this.model.findByIdAndDelete(id).lean();
    if (!res) throw new NotFoundException("Reel not found");
    return { ok: true };
  }

  async like(id: string, inc = 1) {
    const updated = await this.model
      .findByIdAndUpdate(id, { $inc: { likes: inc } }, { new: true })
      .lean();
    if (!updated) throw new NotFoundException("Reel not found");
    return updated;
  }

  async share(id: string) {
    const updated = await this.model
      .findByIdAndUpdate(id, { $inc: { shares: 1 } }, { new: true })
      .lean();
    if (!updated) throw new NotFoundException("Reel not found");
    return updated;
  }

  async addComment(id: string, dto: CreateCommentDto) {
    const _id = new Types.ObjectId();
    await this.model.updateOne(
      { _id: id },
      { $push: { comments: { _id, ...dto, likes: 0, replies: [] } } }
    );
    return this.get(id);
  }

  async likeComment(id: string, commentId: string) {
    const updated = await this.model
      .findOneAndUpdate(
        { _id: id, "comments._id": commentId },
        { $inc: { "comments.$.likes": 1 } },
        { new: true }
      )
      .lean();
    if (!updated) throw new NotFoundException("Comment not found");
    return updated;
  }

  async addReply(id: string, commentId: string, dto: CreateReplyDto) {
    const updated = await this.model
      .findOneAndUpdate(
        { _id: id, "comments._id": commentId },
        { $push: { "comments.$.replies": { ...dto, likes: 0 } } },
        { new: true }
      )
      .lean();
    if (!updated) throw new NotFoundException("Comment not found");
    return updated;
  }
}
