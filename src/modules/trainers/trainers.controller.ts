import { Controller, Get, Query } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { lang } from '../common/decorators/lang.decorator';
import { ApiResponse } from '../common/interfaces/paginated-response.interface';
import { TrainerResponseDto } from './dto/trainer-response.dto';
import { TrainerQueryDto } from './dto/trainer-query.dto';

@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @Get()
  async findAll(
    @Query() query: TrainerQueryDto,
    @lang() lang: string,
  ): Promise<ApiResponse<TrainerResponseDto>> {
    const { page, perPage } = query;
    return this.trainersService.findAll({ page, perPage }, lang);
  }
}
