import { Controller, Post, Body } from '@nestjs/common';
import { LeadWeekendService } from './lead-weekend.service';
import { CreateLeadWeekendApplicantDto } from './dto/create-lead-weekend-applicant.dto';
@Controller('lead-weekend')
export class LeadWeekendController {
  constructor(private readonly service: LeadWeekendService) {}

  @Post('apply')
  async apply(@Body() dto: CreateLeadWeekendApplicantDto) {
    return this.service.createApplicant(dto);
  }
}
