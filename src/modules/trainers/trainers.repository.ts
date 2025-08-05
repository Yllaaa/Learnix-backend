import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { trainers } from '../drizzle/schemas/schema';
import { sql } from 'drizzle-orm';

@Injectable()
export class TrainersRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findAll(pagination: { page: number; perPage: number }) {
    const { page, perPage } = pagination;
    const offset = (page - 1) * perPage;

    const totalResult = await this.drizzleService.db
      .select({ count: sql`count(*)` })
      .from(trainers);
    const total = Number(totalResult[0].count);

    const data = await this.drizzleService.db.query.trainers.findMany({
      columns: {
        id: true,
        nameEn: true,
        nameAr: true,
        titleEn: true,
        titleAr: true,
        linkedIn: true,
      },
      limit: perPage,
      offset: offset,
    });

    return { data, total };
  }
}
