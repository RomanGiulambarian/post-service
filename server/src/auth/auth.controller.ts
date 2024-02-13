import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';
import { config } from 'src/config/app.config';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() authDto: CreateAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(authDto);

    res
      .cookie('refreshToken', refreshToken, {
        secure: true,
        httpOnly: true,
        maxAge: config.REFRESH_TOKEN_EXPIRES_DAYS_IN_MILLISECONDS,
        sameSite: 'none',
      })
      .send(accessToken)
      .end();
  }

  @Post('registration')
  async registration(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.registration(userDto);

    res
      .cookie('refreshToken', refreshToken, {
        secure: true,
        httpOnly: true,
        maxAge: config.REFRESH_TOKEN_EXPIRES_DAYS_IN_MILLISECONDS,
        sameSite: 'none',
      })
      .send(accessToken)
      .end();
  }

  @UseGuards(RefreshTokenGuard)
  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('refreshToken').send().end();
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refreshToken(@Body() authDto: CreateAuthDto, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.refreshToken(
      authDto.email,
    );

    res
      .cookie('refreshToken', refreshToken, {
        secure: true,
        httpOnly: true,
        maxAge: config.REFRESH_TOKEN_EXPIRES_DAYS_IN_MILLISECONDS,
        sameSite: 'none',
      })
      .send(accessToken)
      .end();
  }
}
