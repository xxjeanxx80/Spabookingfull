import { PartialType } from '@nestjs/mapped-types';

import { CreateSpaDto, CreateSpaServiceDto } from './create-spa.dto';

export class UpdateSpaDto extends PartialType(CreateSpaDto) {}

export class UpdateSpaServiceDto extends PartialType(CreateSpaServiceDto) {}
