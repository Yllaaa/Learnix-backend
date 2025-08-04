import { Injectable } from '@nestjs/common';
import { and, or, ilike, eq, inArray } from 'drizzle-orm';
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
          ilike(courses.descriptionEn, `%${filters.search}%`),
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

  findWithFilters(
    filters: CourseFilters = {},
    pagination?: { page?: number; perPage?: number },
  ) {
    const whereClause = this.buildWhereClause(filters);

    const page = pagination?.page || 1;
    const perPage = pagination?.perPage || 10;
    const offset = (page - 1) * perPage;

    const query = this.baseQuery;

    if (whereClause) {
      query.where(whereClause);
    }

    return query.limit(perPage).offset(offset);
  }
}
