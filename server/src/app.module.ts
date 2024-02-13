import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { PostModule } from './modules/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './db/entities/user.entity';
import { Post } from './db/entities/post.entity';
import { Media } from './db/entities/media.entity';
import { AuthModule } from './modules/auth.module';
import { MediaModule } from './modules/media.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { config } from './config/app.config';

@Module({
  imports: [
    PostModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: 'dev.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.POSTGRES_HOST,
      port: config.POSTGRES_PORT,
      username: config.POSTGRES_USER,
      password: config.POSTGRES_PASSWORD,
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
