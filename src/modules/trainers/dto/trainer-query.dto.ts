import { Transform } from 'class-transformer';
import { IsOptional, IsBoolean } from 'class-validator';
import { PaginationDto } from 'src/modules/common/dto/pagination.dto';

export class TrainerQueryDto extends PaginationDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  leadWeekend?: boolean;
}
