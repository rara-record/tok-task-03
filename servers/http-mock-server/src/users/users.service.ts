import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entities';

const user: UserEntity[] = [
  {
    id: '1',
    name: 'test',
    password: 'test',
  },
];

@Injectable()
export class UsersService {
  async findOneBy<T extends keyof UserEntity>(
    key: T,
    value: UserEntity[T],
  ): Promise<UserEntity | undefined> {
    return user.find((user) => user[key] === value);
  }
}
