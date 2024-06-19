import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { IPostEntity } from './entities/post.entity';
import { createPaginate } from 'src/common/utils/pagination';

let posts: IPostEntity[] = Array.from({ length: 100 }).map((_, i) => ({
  id: i,
  title: `Post ${i}`,
  content: `This is post #${i}`,
}));

let nextId = posts.length;

@Injectable()
export class PostsService {
  create(createPostDto: CreatePostDto) {
    const newItem = { id: nextId, ...createPostDto };
    posts.push(newItem);
    nextId++;
    return newItem;
  }

  findIndex(id: number) {
    return posts.findIndex((post) => post.id === id);
  }

  findAll() {
    return posts;
  }

  findItems(limit: number = 10, cursor: number) {
    const pagenate = createPaginate(posts, (item) => item.id);
    return pagenate(limit, cursor);
  }

  findOne(id: number) {
    const idx = this.findIndex(id);
    if (idx === -1) return;
    return posts[idx];
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const idx = this.findIndex(id);
    if (idx === -1) return;
    posts[idx] = { ...posts[idx], ...updatePostDto };
    return posts[idx];
  }

  remove(id: number) {
    const idx = this.findIndex(id);
    if (idx === -1) return;

    posts = posts.filter((post) => post.id !== id);
    return id;
  }
}
