import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/db/entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { config } from 'src/config/app.config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: CreateAuthDto) {
    const user = await this.userService.validateUser(authDto);
    const tokens = await this.generateToken(user);

    return tokens;
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException('Пользователь найден', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });

    const tokens = await this.generateToken(user);

    return tokens;
  }

  async refreshToken(authDto: CreateAuthDto) {
    const user = await this.userService.getUserByEmail(authDto.email);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }

    return await this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };

    const [accessToken, refreshToken] = (
      await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: config.JWT_ACCESS_SECRET,
          expiresIn: config.ACCESS_TOKEN_EXPIRES_HOURS + 'h',
        }),
        this.jwtService.signAsync(payload, {
          secret: config.JWT_REFRESH_SECRET,
          expiresIn: config.REFRESH_TOKEN_EXPIRES_DAYS + 'd',
        }),
      ])
    ).map((token) => 'Bearer ' + token);

    return {
      accessToken,
      refreshToken,
    };
  }
}
