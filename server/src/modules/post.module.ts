import { Module } from '@nestjs/common';
import { PostService } from '../post/post.service';
import { PostController } from '../post/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../db/entities/post.entity';
import { MediaModule } from './media.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    MediaModule,
    JwtModule.register({}),
    UserModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
