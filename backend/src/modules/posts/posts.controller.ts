import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { ApiResponse } from '../../common/dto/api-response.dto';
import { CreatePostDto, UpdatePostDto } from './dto/create-post.dto';
import { PostResponse } from './response/post-response.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() dto: CreatePostDto) {
    const data = await this.postsService.create(dto);
    return new ApiResponse(PostResponse.fromEntity(data), 'Post published');
  }

  @Get()
  async findAll() {
    const data = await this.postsService.findAll();
    return new ApiResponse(data.map(PostResponse.fromEntity));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const data = await this.postsService.update(id, dto);
    return new ApiResponse(PostResponse.fromEntity(data), 'Post updated');
  }
}
