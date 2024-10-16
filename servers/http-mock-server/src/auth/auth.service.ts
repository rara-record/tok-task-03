import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'lodash';
import { UserEntity } from 'src/users/entities/user.entities';
import { ENV } from 'env';
import { JWT } from './constants';
import { UpdateProfileDto } from './dto/update-profile.dto';

export const blackListTokens: string[] = [];

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async refresh(refreshToken: string) {
    const parsed = await this.jwtService
      .verifyAsync(refreshToken, {
        secret: JWT.REFRESH_SECRET,
      })
      .catch((e) => {
        throw new UnauthorizedException({
          name: e.name,
          statusCode: 401,
          message: 'Invalid Token',
        });
      });

    const user = await this.usersService.findOneBy('name', parsed.username);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user?.name, user?.password);
  }

  async signUp(user: Omit<UserEntity, 'id'>) {
    return this.usersService.create(user);
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.usersService.findOneBy('name', username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    return {
      access_token: await this.genrateAccessToken(user),
      refresh_token: await this.generateRefreshToken(username),
    };
  }

  async getProfile(username: string) {
    const res = await this.usersService.findOneBy('name', username);
    return omit(res, ['password']);
  }

  async updateProfile(username: string, data: UpdateProfileDto) {
    const user = await this.usersService.findOneBy('name', username);
    if (!user) {
      throw new BadRequestException("User doesn't exist");
    }
    const res = await this.usersService.update({ id: user.id, ...data });
    return omit(res, ['password']);
  }

  async genrateAccessToken(user: UserEntity) {
    const payload = { sub: user.id, username: user.name };

    return this.jwtService.signAsync(payload, {
      secret: JWT.SECRET,
      expiresIn: ENV.JWT_TOKEN_EXPIRATION,
    });
  }

  async generateRefreshToken(username: string) {
    const user = await this.usersService.findOneBy('name', username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.name };

    return this.jwtService.signAsync(payload, {
      secret: JWT.REFRESH_SECRET,
      expiresIn: ENV.JWT_REFRESH_TOKEN_EXPIRATION,
    });
  }

  toBloackList(token: string) {
    blackListTokens.push(token);
  }

  isBlackList(token: string) {
    return blackListTokens.includes(token);
  }
}
