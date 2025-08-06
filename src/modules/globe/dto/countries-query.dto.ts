import { IsOptional, IsString, IsNumberString, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from 'src/modules/common/dto/pagination.dto';

export class CountriesQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;
}
