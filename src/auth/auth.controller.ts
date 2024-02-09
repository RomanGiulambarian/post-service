import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: CreateAuthDto) {
    return await this.authService.login(authDto);
  }

  @Post('registration')
  async registration(@Body() userDto: CreateUserDto) {
    return await this.authService.registration(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refreshToken(@Body() authDto: CreateAuthDto) {
    return await this.authService.refreshToken(authDto);
  }
}
