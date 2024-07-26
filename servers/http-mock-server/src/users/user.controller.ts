import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateGalleryItemsDto } from './dto/create-gallery-items.dto';
import { CreateGalleryItemsResponseDto } from './dto/create-gallery-items-response.dto';
import { GalleryEntity } from './entities/gallery.entities';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @Post('me/gallery')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: CreateGalleryItemsResponseDto,
  })
  async createGalleryItems(
    @Request() req,
    @Body() body: CreateGalleryItemsDto,
  ) {
    const username: string = req.user?.username;
    const user = await this.userService.findOneBy('name', username);
    if (!user) throw new BadRequestException('User not found');

    return this.userService.createGalleryItemBulk(user.id, body);
  }

  @Get(':id/gallery')
  @ApiOkResponse({
    type: GalleryEntity,
    isArray: true,
  })
  async getGalleryItems(@Param('id') id: string) {
    return this.userService.findGalleryItems(+id);
  }
}
