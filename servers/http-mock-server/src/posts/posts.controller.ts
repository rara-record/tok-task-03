import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListAllDto, listAllSchema } from './dto/list-all.dto';
import { ApiQueries } from 'src/utils/decorators/api-queries';
import { PostEntity } from './entities/post.entity';
import { ApiOkResponsePaginated } from 'src/utils/decorators/paginated';
import { orThrow } from 'src/utils/or-throw';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    type: PostEntity,
  })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiQueries(listAllSchema)
  @ApiOkResponsePaginated(PostEntity)
  findAll(@Query() query: ListAllDto) {
    return this.postsService.findItems(query.limit, query.cursor);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: PostEntity,
  })
  findOne(@Param('id') id: string) {
    return orThrow(
      this.postsService.findOne(+id), //
      new NotFoundException(),
    );
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    type: PostEntity,
  })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return orThrow(
      this.postsService.update(+id, updatePostDto),
      new NotFoundException(),
    );
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
  })
  remove(@Param('id') id: string) {
    return orThrow(
      this.postsService.remove(+id), //
      new NotFoundException(),
    );
  }
}
