import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { ApiResponse } from '../../common/dto/api-response.dto';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerResponse } from './response/customer-response.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(@Body() dto: CreateCustomerDto) {
    const data = await this.customersService.create(dto);
    return new ApiResponse(CustomerResponse.fromEntity(data), 'Customer profile created');
  }

  @Get()
  async findAll() {
    const data = await this.customersService.findAll();
    return new ApiResponse(data.map(CustomerResponse.fromEntity));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.customersService.findOne(id);
    return new ApiResponse(CustomerResponse.fromEntity(data));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    const data = await this.customersService.update(id, dto);
    return new ApiResponse(CustomerResponse.fromEntity(data), 'Customer updated');
  }
}
