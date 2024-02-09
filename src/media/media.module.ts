import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { Media } from './entities/media.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [MediaService],
  exports: [MediaService],
  imports: [TypeOrmModule.forFeature([Media])],
})
export class MediaModule {}
