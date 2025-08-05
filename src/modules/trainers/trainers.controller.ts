import { Controller, Get, Query } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { lang } from '../common/decorators/lang.decorator';
import { ApiPaginatedResponse } from '../common/interfaces/api-paginated-response.interface';
import { TrainerResponseDto } from './dto/trainer-response.dto';
import { TrainerQueryDto } from './dto/trainer-query.dto';

@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @Get()
  async findAll(
    @Query() query: TrainerQueryDto,
    @lang() lang: string,
  ): Promise<ApiPaginatedResponse<TrainerResponseDto>> {
    const { page, perPage } = query;
    return this.trainersService.findAll({ page, perPage }, lang);
  }
}
