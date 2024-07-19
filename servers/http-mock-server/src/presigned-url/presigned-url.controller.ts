import { Controller, Post, Body } from '@nestjs/common';
import { PresignedUrlService } from './presigned-url.service';
import { CreatePresignedUrlDto } from './dto/create-presigned-url.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ENV } from 'env';
import { CreatePresignedUrlResponseDto } from './dto/create-presigned-url-response.dto';

@Controller('presigned-url')
@ApiTags('presigned-url')
export class PresignedUrlController {
  constructor(private readonly presignedUrlService: PresignedUrlService) {}

  @Post()
  @ApiOkResponse({
    status: 201,
    type: CreatePresignedUrlResponseDto,
  })
  async create(@Body() createPresignedUrlDto: CreatePresignedUrlDto) {
    const created = await this.presignedUrlService.create(
      createPresignedUrlDto,
    );
    return {
      url: `http://localhost:${ENV.PORT}/file`,
      fields: {
        key: created.key,
      },
    };
  }
}
