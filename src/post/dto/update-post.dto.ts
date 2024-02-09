import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  mediaToDelete?: string[];
  // mediaToAdd?: Express.Multer.File[];
}
