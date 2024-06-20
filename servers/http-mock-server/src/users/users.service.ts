import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity, userRepo } from './entities/user.entities';

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
}
