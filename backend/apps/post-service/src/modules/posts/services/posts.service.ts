import { Injectable } from '@nestjs/common';
import { createPaginatedResponse, PaginationQueryDto } from '@app/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostEntity } from '../entities/post.entity';
import { toPostResponse } from '../response/post-response.dto';

@Injectable()
export class PostsService {
  private posts: PostEntity[] = [];

  list(spaId: string, pagination: PaginationQueryDto) {
    const { page = 1, limit = 20 } = pagination;
    const filtered = this.posts.filter((item) => !spaId || item.spaId === spaId);
    const items = filtered
      .slice((page - 1) * limit, (page - 1) * limit + limit)
      .map(toPostResponse);
    return createPaginatedResponse(items, filtered.length, page, limit);
  }

  create(payload: CreatePostDto) {
    const entity = new PostEntity({ id: `post-${Date.now()}`, ...payload });
    this.posts.push(entity);
    return toPostResponse(entity);
  }

  update(id: string, payload: UpdatePostDto) {
    const post = this.posts.find((item) => item.id === id);
    if (!post) {
      throw new Error(`Post ${id} not found`);
    }
    Object.assign(post, payload);
    return toPostResponse(post);
  }

  remove(id: string) {
    const index = this.posts.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(`Post ${id} not found`);
    }
    const [removed] = this.posts.splice(index, 1);
    return toPostResponse(removed);
  }
}
