import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSlideDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  coloration: string;
}

export class CreateBlockDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSlideDto)
  slides: CreateSlideDto[];
}

export class CreateSampleDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBlockDto)
  blocks: CreateBlockDto[];
}

export class CreateCaseDto {
  @IsOptional()
  id?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSampleDto)
  samples: CreateSampleDto[];
}
