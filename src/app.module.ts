import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { Post } from './post/entities/post.entity';
import { Media } from './media/entities/media.entity';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    PostModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: 'dev.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      entities: [Post, User, Media],
      synchronize: true,
    }),
    AuthModule,
    MediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
