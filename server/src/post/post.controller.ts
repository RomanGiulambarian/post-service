import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  Res,
  NotFoundException,
  UseGuards,
  Req,
  UploadedFiles,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { MediaService } from 'src/media/media.service';
import { extendedRequest } from 'src/common/types/global.types';

@Controller('post')
@UseGuards(AccessTokenGuard)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly mediaService: MediaService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 1000000,
        })
        .build({
          fileIsRequired: false,
        }),
    )
    images: Express.Multer.File[],
    @Req() req: extendedRequest,
  ) {
    return this.postService.create(createPostDto, req.user.email, images);
  }

  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('mediaToAdd'))
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 1000000,
        })
        .build({
          fileIsRequired: false,
        }),
    )
    mediaToAdd: Express.Multer.File[],
  ) {
    const updatedPost = this.postService.update(
      id,
      {
        title: updatePostDto.title,
        description: updatePostDto.description,
        mediaToDelete: updatePostDto.mediaToDelete,
      },
      mediaToAdd,
    );

    if (!updatedPost) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return updatedPost;
  }

  @Delete(':id')
  async softDelete(@Param('id') id: string, @Res() res: Response) {
    await this.postService.softDelete(id);
    res.status(204).send().end();
  }

  @Get(':id')
  async restore(@Param('id') id: string) {
    return await this.postService.restore(id);
  }
}
