import { IsOptional, IsString, IsNumberString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from 'src/modules/common/dto/pagination.dto';

export class CitiesQueryDto extends PaginationDto {
  @IsOptional()
  @IsNumberString({}, { message: 'Country ID must be a valid number' })
  @Transform(({ value }) => parseInt(value))
  countryId?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
