import { Body, Controller, Get, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { KycService } from './kyc.service';
import { minio, KYC_BUCKET } from '../../integrations/minio.client';
import * as crypto from 'crypto';

async function putToMinio(file: Express.Multer.File) {
  const ext = (file.originalname.split('.').pop() || 'bin').toLowerCase();
  const key = `kyc/${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${ext}`;
  await minio.putObject(KYC_BUCKET, key, file.buffer, { 'Content-Type': file.mimetype });
  return `/${KYC_BUCKET}/${key}`;
}

@Controller('kyc')
@UseGuards(JwtGuard)
export class KycController {
  constructor(private readonly service: KycService) {}

  @Post('submit')
  @UseInterceptors(FilesInterceptor('files'))
  async submit(@Req() req: any, @Body() body: any, @UploadedFiles() files: Express.Multer.File[]) {
    const docType = String(body.documentType || 'aadhaar');
    const front = files?.[0] ? await putToMinio(files[0]) : '';
    const back = files?.[1] ? await putToMinio(files[1]) : undefined;
    return this.service.submit(req.user.id, docType, front, back);
  }

  @Get('me')
  me(@Req() req: any) {
    return this.service.me(req.user.id);
  }
}
