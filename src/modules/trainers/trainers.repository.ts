import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { trainers } from '../drizzle/schemas/schema';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class TrainersRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findAll(
    leadWeekend: boolean,
    pagination: { page: number; perPage: number },
  ) {
    const { page, perPage } = pagination;
    const offset = (page - 1) * perPage;

    const whereClause = leadWeekend
      ? (trainers: any, { eq }: any) => eq(trainers.leadWeekend, true)
      : undefined;
    const totalResult = await this.drizzleService.db
      .select({ count: sql`count(*)` })
      .from(trainers)
      .where(whereClause ? whereClause(trainers, { eq }) : undefined);
    const total = Number(totalResult[0].count);

    const data = await this.drizzleService.db.query.trainers.findMany({
      columns: {
        id: true,
        nameEn: true,
        nameAr: true,
        titleEn: true,
        titleAr: true,
        linkedIn: true,
        trainerPicture: true,
        leadWeekend: true,
      },
      limit: perPage,
      offset: offset,
      where: whereClause ? whereClause(trainers, { eq }) : undefined,
    });

    return { data, total };
  }
}
