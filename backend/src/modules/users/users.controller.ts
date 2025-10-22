import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { ApiResponse } from '../../common/dto/api-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './response/user.response';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const data = await this.usersService.create(dto);
    return new ApiResponse(UserResponse.fromEntity(data));
  }

  @Get()
  async findAll() {
    const data = await this.usersService.findAll();
    return new ApiResponse(data.map(UserResponse.fromEntity));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.usersService.findById(id);
    return new ApiResponse(data ? UserResponse.fromEntity(data) : null);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const data = await this.usersService.update(id, dto);
    return new ApiResponse(data ? UserResponse.fromEntity(data) : null, 'User updated');
  }
}
