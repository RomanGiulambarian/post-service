import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: CreateAuthDto) {
    const user = await this.validateUser(authDto);

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return { accessToken, refreshToken };
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

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async refreshToken(authDto: CreateAuthDto) {
    const user = await this.userService.getUserByEmail(authDto.email);

    if (user) {
      throw new HttpException('Пользователь найден', HttpStatus.BAD_REQUEST);
    }

    const accessToken = await this.generateAccessToken(user);

    return { accessToken };
  }

  private async generateAccessToken(user: User) {
    const payload = { email: user.email, id: user.id };

    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  private async generateRefreshToken(user: User) {
    const payload = { id: user.id, tokenId: uuidv4() };

    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Некорректный емаил или пароль',
    });
  }
}
