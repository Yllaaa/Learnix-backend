import { Injectable } from '@nestjs/common';
import { and, or, ilike, eq, inArray, count } from 'drizzle-orm';
import { DrizzleService } from 'src/modules/drizzle/drizzle.service';
import {
  courses,
  countries,
  cities,
  courseCategories,
} from 'src/modules/drizzle/schemas/schema';

export interface CourseFilters {
  search?: string;
  cityId?: number;
  categoryIds?: number[];
}

@Injectable()
export class CourseQueryBuilder {
  constructor(private readonly drizzleService: DrizzleService) {}

  private get baseQuery() {
    return this.drizzleService.db
      .select({
        id: courses.id,
        titleEn: courses.titleEn,
        titleAr: courses.titleAr,
        descriptionEn: courses.descriptionEn,
        descriptionAr: courses.descriptionAr,
        startDate: courses.startDate,
        price: courses.price,
        category: {
          id: courseCategories.id,
          nameAr: courseCategories.nameAr,
          nameEn: courseCategories.nameEn,
        },
        country: {
          id: countries.id,
          nameAr: countries.nameAr,
          nameEn: countries.nameEn,
        },
        city: {
          id: cities.id,
          nameAr: cities.nameAr,
          nameEn: cities.nameEn,
        },
      })
      .from(courses)
      .leftJoin(countries, eq(courses.countryId, countries.id))
      .leftJoin(cities, eq(courses.cityId, cities.id))
      .leftJoin(courseCategories, eq(courses.categoryId, courseCategories.id));
  }

  buildWhereClause(filters: CourseFilters) {
    const conditions: Array<
      | ReturnType<typeof eq>
      | ReturnType<typeof or>
      | ReturnType<typeof ilike>
      | ReturnType<typeof inArray>
    > = [];

    if (filters.search) {
      conditions.push(
        or(
          ilike(courses.titleEn, `%${filters.search}%`),
          ilike(courses.titleAr, `%${filters.search}%`),
          ilike(courses.descriptionEn, `%${filters.search}%`),
          ilike(courses.descriptionAr, `%${filters.search}%`),
        ),
      );
    }

    if (filters.cityId) {
      conditions.push(eq(courses.cityId, filters.cityId));
    }

    if (filters.categoryIds?.length) {
      conditions.push(inArray(courses.categoryId, filters.categoryIds));
    }

    return conditions.length > 0 ? and(...conditions) : undefined;
  }

  async findWithFilters(
    filters: CourseFilters = {},
    pagination?: { page?: number; perPage?: number },
  ) {
    const whereClause = this.buildWhereClause(filters);

    const page = pagination?.page || 1;
    const perPage = Math.min(pagination?.perPage || 10, 100);
    const offset = (page - 1) * perPage;

    const query = this.baseQuery
      .where(whereClause)
      .limit(perPage)
      .offset(offset);

    return await query;
  }

  async count(filters: CourseFilters = {}): Promise<number> {
    const whereClause = this.buildWhereClause(filters);

    const countQuery = this.drizzleService.db
      .select({ count: count() })
      .from(courses)
      .leftJoin(countries, eq(courses.countryId, countries.id))
      .leftJoin(cities, eq(courses.cityId, cities.id))
      .leftJoin(courseCategories, eq(courses.categoryId, courseCategories.id))
      .where(whereClause);

    const result = await countQuery;

    return result[0]?.count || 0;
  }
}
