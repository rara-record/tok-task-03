import { Injectable } from '@nestjs/common';
import { presignedUrlRepo } from './entities/presigned-url.entity';
import { CreatePresignedUrlDto } from './dto/create-presigned-url.dto';
import * as path from 'path';

@Injectable()
export class PresignedUrlService {
  create(dto: CreatePresignedUrlDto) {
    const { fileName, fileType } = dto;
    const parsed = path.parse(fileName);
    const filename = `${parsed.name}-${Date.now().toString()}${parsed.ext}`;

    const key = `/_media/${encodeURIComponent(filename)}`;

    return presignedUrlRepo.create({
      fileName,
      fileType,
      key,
    });
  }
}
