import { Module } from '@nestjs/common';
import { GlobeService } from './globe.service';
import { GlobeController } from './globe.controller';
import { GlobeRepository } from './globe.repository';

@Module({
  providers: [GlobeService, GlobeRepository],
  controllers: [GlobeController],
})
export class GlobeModule {}
