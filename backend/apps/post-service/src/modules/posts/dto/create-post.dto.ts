import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  spaId!: string;

  @IsString()
  title!: string;

  @IsString()
  content!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
