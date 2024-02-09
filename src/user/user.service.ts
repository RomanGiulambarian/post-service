import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../db/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto).save();
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['posts'] });
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({
      relations: ['posts'],
      where: { id },
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    email: string,
  ): Promise<UpdateResult> {
    const userIsValid = await this.validateUser(updateUserDto, email);
    const hashPassword = updateUserDto.newPassword
      ? await bcrypt.hash(updateUserDto.newPassword, 5)
      : userIsValid.password;

    return await this.userRepository.update(id, {
      username: updateUserDto.username,
      email: updateUserDto.email,
      password: hashPassword,
    });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      relations: ['posts'],
      where: { email },
    });
  }

  private async getUserByEmailPrivate(email: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  }

  async validateUser(userDto: CreateUserDto | UpdateUserDto, email?: string) {
    let userEmail: string = email ?? userDto.email;
    const user = await this.getUserByEmailPrivate(userEmail);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Пользователь не найден',
      });
    }

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Некорректный емеил или пароль',
    });
  }
}
