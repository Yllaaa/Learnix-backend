import { Injectable } from '@nestjs/common';
import { LeadWeekendRepository } from './lead-weekend.repository';
import { CreateLeadWeekendApplicantDto } from './dto/create-lead-weekend-applicant.dto';
@Injectable()
export class LeadWeekendService {
  constructor(private readonly leadWeekendRepository: LeadWeekendRepository) {}

  async createApplicant(dto: CreateLeadWeekendApplicantDto) {
    return this.leadWeekendRepository.createApplicant(dto);
  }
}
