import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity, userRepo } from './entities/user.entities';
import {
  GalleryEntity,
  IGalleryEntity,
  galleryRepo,
} from './entities/gallery.entities';
import { CreateGalleryItemsDto } from './dto/create-gallery-items.dto';

@Injectable()
export class UsersService {
  async findOneBy<T extends keyof UserEntity>(
    key: T,
    value: UserEntity[T],
  ): Promise<UserEntity | undefined> {
    return userRepo.findOne({
      query: [
        {
          key,
          value,
        } as any,
      ],
    });
  }

  async create(data: Omit<UserEntity, 'id'>) {
    if (await this.findOneBy('name', data.name)) {
      throw new BadRequestException('User already exists');
    }

    return userRepo.create(data);
  }

  async update(data: Partial<UserEntity> & { id: number }) {
    if (data.name) {
      const someUser = await this.findOneBy('name', data.name);
      const isAlreadyExists = someUser && someUser?.id !== data.id;
      if (isAlreadyExists) throw new BadRequestException('User already exists');
    }

    const { id, ...rest } = data;
    return userRepo.update(
      {
        query: [{ key: 'id', value: id }],
      },
      (user) => ({ ...user, ...rest }),
    );
  }
  async createGalleryItem(data: Omit<GalleryEntity, 'createdAt'>) {
    return galleryRepo.create(data);
  }

  async findGalleryItems(userId: number) {
    return galleryRepo.findMany({
      query: [{ key: 'userId', value: userId }],
    });
  }

  async createGalleryItemBulk(userId: number, data: CreateGalleryItemsDto) {
    const res = await Promise.allSettled(
      data.srcSet.map((src) =>
        this.createGalleryItem({
          userId,
          src,
        }),
      ),
    );

    const results = res.reduce<{
      uploaded: IGalleryEntity[];
      failed: { src: string; error: any }[];
    }>(
      (acc, cur, idx) => {
        if (cur.status === 'fulfilled') {
          acc.uploaded.push(cur.value);
        } else {
          acc.failed.push({
            src: data.srcSet[idx],
            error: cur.reason,
          });
        }
        return acc;
      },
      {
        uploaded: [],
        failed: [],
      },
    );

    return results;
  }
}
