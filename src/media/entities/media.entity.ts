import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from '../../post/entities/post.entity';

@Entity()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Post, (post) => post.media)
  post: Post;
}
