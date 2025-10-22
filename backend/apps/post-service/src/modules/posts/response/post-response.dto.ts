import { PostEntity } from '../entities/post.entity';

export interface PostResponseDto {
  id: string;
  spaId: string;
  title: string;
  content: string;
  tags: string[];
  publishedAt: string;
}

export const toPostResponse = (entity: PostEntity): PostResponseDto => ({
  id: entity.id,
  spaId: entity.spaId,
  title: entity.title,
  content: entity.content,
  tags: entity.tags,
  publishedAt: entity.publishedAt,
});
