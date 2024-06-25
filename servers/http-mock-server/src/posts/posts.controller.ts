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
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ListAllDto, listAllSchema } from './dto/list-all.dto';
import { PostEntity } from './entities/post.entity';
import { ApiOkResponsePaginated } from 'src/common/decorators/paginated';
import { ApiQueries } from 'src/common/decorators/api-queries';
import { orThrow } from 'src/common/utils/or-throw';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostEntity })
  findOne(@Param('id') id: string) {
    return orThrow(
      this.postsService.findOne(+id), //
      new NotFoundException(),
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostEntity })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return orThrow(
      this.postsService.update(+id, updatePostDto),
      new NotFoundException(),
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ status: 204 })
  remove(@Param('id') id: string) {
    return orThrow(
      this.postsService.remove(+id), //
      new NotFoundException(),
    );
  }
}
