import { Module } from '@nestjs/common';
import { TrainersController } from './trainers.controller';
import { TrainersService } from './trainers.service';
import { TrainersRepository } from './trainers.repository';

@Module({
  controllers: [TrainersController],
  providers: [TrainersService, TrainersRepository],
})
export class TrainersModule {}
