import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from '../common/guards/access-token.guard';
import { Response } from 'express';
import { extendedRequest } from 'src/common/types/global.types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async getAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    } else {
      return user;
    }
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: extendedRequest,
  ) {
    return await this.userService.update(id, updateUserDto, req.user.email);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    await this.userService.remove(id);

    res.status(204).send().end();
  }
}
