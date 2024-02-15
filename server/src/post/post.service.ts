import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Post } from '../db/entities/post.entity';
import { MediaService } from 'src/media/media.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private mediaService: MediaService,
    private userService: UserService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    email: string,
    images?: Express.Multer.File[],
  ): Promise<Post> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }
    const post = await this.postRepository.save(
      this.postRepository.create({ ...createPostDto, user: { id: user.id } }),
    );

    await this.mediaService.createMedia(images, post.id);

    return post;
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({
      relations: ['media'],
    });
  }

  async findOne(id: string): Promise<Post> {
    return await this.postRepository.findOne({
      relations: ['media'],
      where: { id },
    });
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    mediaToAdd?: Express.Multer.File[],
  ): Promise<Post> {
    if (updatePostDto.mediaToDelete?.length > 0) {
      await this.mediaService.deleteMedia(updatePostDto.mediaToDelete);
    }

    if (mediaToAdd?.length > 0) {
      await this.mediaService.createMedia(mediaToAdd, id);
    }

    await this.postRepository.update(id, {
      title: updatePostDto.title,
      description: updatePostDto.description,
    });

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }

  async softDelete(id: string): Promise<void> {
    const post = await this.findOne(id);

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    const mediaToDelete = post.media.map((img) => img.id);

    await this.mediaService.deleteMedia(mediaToDelete);
    await this.postRepository.softDelete(id);
  }

  async restore(id: string): Promise<void> {
    await this.postRepository.restore(id);
  }
}
