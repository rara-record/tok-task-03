import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { postRepo } from './entities/post.entity';
import { createPaginate } from 'src/common/utils/pagination';

@Injectable()
export class PostsService {
  create(createPostDto: CreatePostDto) {
    return postRepo.create(createPostDto);
  }

  findAll() {
    return postRepo.findAll();
  }

  findItems(limit: number = 10, cursor?: number) {
    const posts = postRepo.findAll();
    const pagenate = createPaginate(posts, (item) => item.id);
    return pagenate(limit, cursor);
  }

  findOne(id: number) {
    return postRepo.findOne({ query: [{ key: 'id', value: id }] });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return postRepo.update(
      {
        query: [{ key: 'id', value: id }],
      },
      (post) => ({ ...post, ...updatePostDto }),
    );
  }

  remove(id: number) {
    return postRepo.remove({ query: [{ key: 'id', value: id }] });
  }
}
