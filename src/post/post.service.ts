import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Post } from './entities/post.entity';
import { MediaService } from 'src/media/media.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private mediaService: MediaService,
  ) {}

  async create(createPostDto: CreatePostDto, image: any): Promise<Post> {
    const mediaName = await this.mediaService.createMedia(image);
    const post = await this.postRepository.save(
      this.postRepository.create(createPostDto),
    );

    return post;
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async findOne(id: string): Promise<Post> {
    return await this.postRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<UpdateResult> {
    return await this.postRepository.update(id, updatePostDto);
  }

  async remove(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }
}
