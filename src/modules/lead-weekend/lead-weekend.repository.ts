import { Injectable } from '@nestjs/common';
import { CreateLeadWeekendApplicantDto } from './dto/create-lead-weekend-applicant.dto';
import { leadWeekendApplicants } from '../drizzle/schemas/schema';
import { DrizzleService } from '../drizzle/drizzle.service';

@Injectable()
export class LeadWeekendRepository {
  constructor(private readonly drizzleService: DrizzleService) {}
  async createApplicant(dto: CreateLeadWeekendApplicantDto) {
    const [applicant] = await this.drizzleService.db
      .insert(leadWeekendApplicants)
      .values({
        ...dto,
      })
      .returning();

    return applicant;
  }
}
