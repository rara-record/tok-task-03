import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { CredentialDto } from './dto/credential.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserEntity } from 'src/users/entities/user.entities';
import { SocialLoginDto } from './dto/social-login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { ProfileDto } from './dto/profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('singup')
  @ApiOkResponse({
    type: UserEntity,
  })
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOkResponse({
    type: CredentialDto,
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @ApiOkResponse({
    type: CredentialDto,
  })
  @Post('social-login')
  async socialLogin(@Body() socialLoginDto: SocialLoginDto) {
    const created = await this.authService.signUp({
      name: socialLoginDto.code,
      password: socialLoginDto.type,
      social: socialLoginDto.type,
    });

    return this.authService.signIn(created.name, created.password);
  }

  @Post('refresh')
  @ApiOkResponse({ type: CredentialDto })
  refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto.refreshToken);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOkResponse({ type: ProfileDto })
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user?.username);
  }

  @UseGuards(AuthGuard)
  @Patch('profile')
  @ApiBearerAuth()
  @ApiOkResponse({ type: ProfileDto })
  updateProfile(@Request() req, @Body() data: UpdateProfileDto) {
    return this.authService.updateProfile(req.user?.username, data);
  }
}
