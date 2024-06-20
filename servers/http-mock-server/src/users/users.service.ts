import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entities';

const user: UserEntity[] = [
  {
    id: 0,
    name: 'test',
    password: 'test',
  },
];

let nextId = user.length;

@Injectable()
export class UsersService {
  async findOneBy<T extends keyof UserEntity>(
    key: T,
    value: UserEntity[T],
  ): Promise<UserEntity | undefined> {
    return user.find((user) => user[key] === value);
  }

  async create(data: Omit<UserEntity, 'id'>) {
    if (await this.findOneBy('name', data.name)) {
      throw new BadRequestException('User already exists');
    }
    const item = { id: nextId, ...data };
    user.push(item);
    nextId++;

    return item;
  }
}
