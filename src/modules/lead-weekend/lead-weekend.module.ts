import { Module } from '@nestjs/common';
import { LeadWeekendController } from './lead-weekend.controller';
import { LeadWeekendService } from './lead-weekend.service';
import { LeadWeekendRepository } from './lead-weekend.repository';

@Module({
  controllers: [LeadWeekendController],
  providers: [LeadWeekendService, LeadWeekendRepository],
})
export class LeadWeekendModule {}
