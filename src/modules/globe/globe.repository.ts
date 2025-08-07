import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { ilike, or, eq, and, count } from 'drizzle-orm';
import { cities, countries } from '../drizzle/schemas/schema';

export interface FindCitiesOptions {
  page: number;
  perPage: number;
  countryId?: number;
  search?: string;
}

export interface FindCitiesResult {
  data: any[];
  total: number;
}

export interface FindCountriesOptions {
  page: number;
  perPage: number;
  search?: string;
}

export interface FindCountriesResult {
  data: any[];
  total: number;
}

@Injectable()
export class GlobeRepository {
  constructor(private readonly drizzleService: DrizzleService) {}
  async findCities(options: FindCitiesOptions): Promise<FindCitiesResult> {
    const { page, perPage, countryId, search } = options;
    const offset = (page - 1) * perPage;

    const whereConditions: Array<
      ReturnType<typeof eq> | ReturnType<typeof or> | ReturnType<typeof ilike>
    > = [];

    if (countryId) {
      whereConditions.push(eq(cities.countryId, countryId));
    }

    if (search) {
      whereConditions.push(
        or(
          ilike(cities.nameEn, `%${search}%`),
          ilike(cities.nameAr, `%${search}%`),
        ),
      );
    }

    const whereClause =
      whereConditions.length > 0 ? and(...whereConditions) : undefined;

    const totalResult = await this.drizzleService.db
      .select({ count: count() })
      .from(cities)
      .where(whereClause);

    const total = totalResult[0]?.count || 0;

    const data = await this.drizzleService.db
      .select({
        id: cities.id,
        nameEn: cities.nameEn,
        nameAr: cities.nameAr,
        countryId: cities.countryId,
        createdAt: cities.createdAt,
        updatedAt: cities.updatedAt,
      })
      .from(cities)
      .where(whereClause)
      .orderBy(cities.nameEn)
      .limit(perPage)
      .offset(offset);

    return { data, total };
  }

  async findCountries(
    options: FindCountriesOptions,
  ): Promise<FindCountriesResult> {
    const { page, perPage, search } = options;
    const offset = (page - 1) * perPage;

    const searchCondition = search
      ? or(
          ilike(countries.nameEn, `%${search}%`),
          ilike(countries.nameAr, `%${search}%`),
        )
      : undefined;

    const totalResult = await this.drizzleService.db
      .select({ count: count() })
      .from(countries)
      .innerJoin(cities, eq(countries.id, cities.countryId))
      .where(searchCondition)
      .groupBy(countries.id);

    const total = totalResult.length;

    const data = await this.drizzleService.db
      .select({
        id: countries.id,
        nameEn: countries.nameEn,
        nameAr: countries.nameAr,
        iso: countries.iso,
        createdAt: countries.createdAt,
        updatedAt: countries.updatedAt,
      })
      .from(countries)
      .innerJoin(cities, eq(countries.id, cities.countryId))
      .where(searchCondition)
      .groupBy(
        countries.id,
        countries.nameEn,
        countries.nameAr,
        countries.iso,
        countries.createdAt,
        countries.updatedAt,
      )
      .orderBy(countries.nameEn)
      .limit(perPage)
      .offset(offset);

    return { data, total };
  }
}
