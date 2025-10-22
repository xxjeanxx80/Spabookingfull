import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SpasService } from '../spas/spas.service';
import { CreatePostDto, UpdatePostDto } from './dto/create-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly repository: Repository<PostEntity>,
    private readonly spasService: SpasService
  ) {}

  async create(dto: CreatePostDto) {
    const spa = await this.spasService.findOne(dto.spaId);
    const entity = this.repository.create({
      spa,
      title: dto.title,
      content: dto.content,
      coverImageUrl: dto.coverImageUrl,
      published: dto.published ?? true
    });
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async update(id: string, dto: UpdatePostDto) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Post not found');
    }

    if (dto.spaId) {
      entity.spa = await this.spasService.findOne(dto.spaId);
    }
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }
}
