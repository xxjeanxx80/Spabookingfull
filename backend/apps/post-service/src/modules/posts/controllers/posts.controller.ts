import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { createApiResponse, PaginationQueryDto } from '@app/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  list(@Query('spaId') spaId: string, @Query() pagination: PaginationQueryDto) {
    return createApiResponse(this.postsService.list(spaId, pagination));
  }

  @Post()
  create(@Body() payload: CreatePostDto) {
    return createApiResponse(this.postsService.create(payload));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdatePostDto) {
    return createApiResponse(this.postsService.update(id, payload));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return createApiResponse(this.postsService.remove(id));
  }
}
