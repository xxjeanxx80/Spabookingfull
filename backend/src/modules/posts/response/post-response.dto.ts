import { PostEntity } from '../entities/post.entity';

export class PostResponse {
  id: string;
  spaId: string;
  title: string;
  content: string;
  coverImageUrl?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;

  static fromEntity(entity: PostEntity): PostResponse {
    return {
      id: entity.id,
      spaId: entity.spa.id,
      title: entity.title,
      content: entity.content,
      coverImageUrl: entity.coverImageUrl,
      published: entity.published,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    };
  }
}
