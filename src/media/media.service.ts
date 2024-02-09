import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Media } from '../db/entities/media.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async createMedia(
    images: Express.Multer.File[],
    postId: string,
  ): Promise<string[]> {
    try {
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      const fileNames: string[] = [];

      for (const image of images) {
        const { id } = await this.mediaRepository.save(
          this.mediaRepository.create({ post: { id: postId } }),
        );
        const fileName = `${id}.jpg`;

        fs.writeFileSync(path.join(filePath, fileName), image.buffer);
        fileNames.push(fileName);
      }

      return fileNames;
    } catch (e) {
      throw new HttpException(
        'Ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteMedia(mediaToDelete: string[]): Promise<void> {
    try {
      mediaToDelete.forEach(async (mediaId) => {
        const media = await this.mediaRepository.findOneBy({ id: mediaId });
        if (!media) {
          throw new HttpException('Медиа не найдено', HttpStatus.NOT_FOUND);
        }

        const filePath = path.resolve(
          __dirname,
          '..',
          'static',
          `${mediaId}.jpg`,
        );

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }

        await this.mediaRepository.remove(media);
      });
    } catch (e) {
      throw new HttpException(
        'Ошибка при удалении медиа',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
