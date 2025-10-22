import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { createApiResponse, PaginationQueryDto } from '@app/common';
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll(@Query() pagination: PaginationQueryDto) {
    return createApiResponse(this.customersService.findAll(pagination));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return createApiResponse(this.customersService.findOne(id));
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return createApiResponse(this.customersService.create(payload));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCustomerDto) {
    return createApiResponse(this.customersService.update(id, payload));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return createApiResponse(this.customersService.remove(id));
  }

  @Post(':id/loyalty')
  updateLoyalty(@Param('id') id: string, @Body('delta') delta: number) {
    return createApiResponse(this.customersService.adjustLoyalty(id, delta));
  }
}
