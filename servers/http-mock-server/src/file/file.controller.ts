import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiExcludeController,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { createDiskStorage } from './file.disk-storage';
import { presignedUrlRepo } from 'src/presigned-url/entities/presigned-url.entity';

@ApiTags('file')
@ApiExcludeController()
@Controller('file')
export class FileController {
  constructor() {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        key: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: createDiskStorage('public'),
      fileFilter: (req, file, cb) => {
        const found = presignedUrlRepo.findOne({
          query: [{ key: 'key', value: req.body.key }],
        });
        if (!found) {
          return cb(new BadRequestException('Invalid key'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log(file, body);
  }
}
