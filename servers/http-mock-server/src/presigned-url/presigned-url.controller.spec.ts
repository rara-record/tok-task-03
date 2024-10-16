import { Test, TestingModule } from '@nestjs/testing';
import { PresignedUrlController } from './presigned-url.controller';
import { PresignedUrlService } from './presigned-url.service';

describe('PresignedUrlController', () => {
  let controller: PresignedUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresignedUrlController],
      providers: [PresignedUrlService],
    }).compile();

    controller = module.get<PresignedUrlController>(PresignedUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
