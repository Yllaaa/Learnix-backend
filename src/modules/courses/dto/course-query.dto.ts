import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  IsArray,
  IsDateString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PaginationDto } from 'src/modules/common/dto/pagination.dto';

export class CourseQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  search?: string;

  @IsOptional()
  @Type(() => Number)
  categoryId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  cityId?: number;

  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @IsOptional()
  @IsDateString()
  dateTo?: string;
}
