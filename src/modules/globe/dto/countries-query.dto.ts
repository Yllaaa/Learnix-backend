import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/modules/common/dto/pagination.dto';

export class CountriesQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;
}
