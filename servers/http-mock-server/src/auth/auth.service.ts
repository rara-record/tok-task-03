import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.usersService.findOneBy('name', username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.name };

    const access = await this.jwtService.signAsync(payload, {
      expiresIn: '60s',
    });

    const refresh = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });

    return {
      access_token: access,
      refresh_token: refresh,
    };
  }

  async getProfile(username: string) {
    const res = await this.usersService.findOneBy('name', username);
    return omit(res, ['password']);
  }
}
