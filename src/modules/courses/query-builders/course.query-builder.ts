import { Injectable } from '@nestjs/common';
import { and, or, ilike, eq, inArray, count, gte, lte, sql } from 'drizzle-orm';
import { DrizzleService } from 'src/modules/drizzle/drizzle.service';
import {
  courses,
  countries,
  cities,
  courseCategories,
  categories,
} from 'src/modules/drizzle/schemas/schema';

export interface CourseFilters {
  search?: string;
  cityId?: number;
  categoryIds?: number[];
  dateFrom?: string;
  dateTo?: string;
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
        country: {
          id: countries.id,
          nameAr: countries.nameAr,
          nameEn: countries.nameEn,
          iso: countries.iso,
        },
        city: {
          id: cities.id,
          nameAr: cities.nameAr,
          nameEn: cities.nameEn,
        },
        categories: sql`
          COALESCE(
            json_agg(
              DISTINCT jsonb_build_object(
                'id', ${categories.id},
                'nameAr', ${categories.nameAr},
                'nameEn', ${categories.nameEn}
              )
            ) FILTER (WHERE ${categories.id} IS NOT NULL),
            '[]'
          )
        `.as('categories'),
      })
      .from(courses)
      .leftJoin(cities, eq(courses.cityId, cities.id))
      .leftJoin(countries, eq(cities.countryId, countries.id))
      .leftJoin(courseCategories, eq(courses.id, courseCategories.courseId))
      .leftJoin(categories, eq(courseCategories.categoryId, categories.id))
      .groupBy(courses.id, cities.id, countries.id);
  }

  buildWhereClause(filters: CourseFilters) {
    const conditions: Array<
      | ReturnType<typeof eq>
      | ReturnType<typeof or>
      | ReturnType<typeof ilike>
      | ReturnType<typeof gte>
      | ReturnType<typeof lte>
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

    if (filters.dateFrom) {
      conditions.push(gte(courses.startDate, filters.dateFrom));
    }

    if (filters.dateTo) {
      conditions.push(lte(courses.startDate, filters.dateTo));
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

    let query: any = this.drizzleService.db
      .select({
        id: courses.id,
        titleEn: courses.titleEn,
        titleAr: courses.titleAr,
        descriptionEn: courses.descriptionEn,
        descriptionAr: courses.descriptionAr,
        startDate: courses.startDate,
        price: courses.price,
        country: {
          id: countries.id,
          nameAr: countries.nameAr,
          nameEn: countries.nameEn,
          iso: countries.iso,
        },
        city: {
          id: cities.id,
          nameAr: cities.nameAr,
          nameEn: cities.nameEn,
        },
        categories: sql`
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object(
              'id', ${categories.id},
              'nameAr', ${categories.nameAr},
              'nameEn', ${categories.nameEn}
            )
          ) FILTER (WHERE ${categories.id} IS NOT NULL),
          '[]'
        )
      `.as('categories'),
      })
      .from(courses)
      .leftJoin(cities, eq(courses.cityId, cities.id))
      .leftJoin(countries, eq(cities.countryId, countries.id))
      .leftJoin(courseCategories, eq(courses.id, courseCategories.courseId))
      .leftJoin(categories, eq(courseCategories.categoryId, categories.id))
      .groupBy(courses.id, cities.id, countries.id);

    if (whereClause) {
      query = query.where(whereClause);
    }

    if (filters.categoryIds?.length) {
      query = query.having(
        sql`EXISTS (
        SELECT 1
        FROM ${courseCategories}
        WHERE ${courseCategories.courseId} = ${courses.id}
          AND ${inArray(courseCategories.categoryId, filters.categoryIds)}
      )`,
      );
    }

    const result = await query.limit(perPage).offset(offset);

    return result.map((row: any) => ({
      ...row,
      categories:
        typeof row.categories === 'string'
          ? JSON.parse(row.categories)
          : Array.isArray(row.categories)
            ? row.categories
            : [],
    }));
  }

  async count(filters: CourseFilters = {}): Promise<number> {
    const whereClause = this.buildWhereClause(filters);

    let countQuery = this.drizzleService.db
      .select({ count: count() })
      .from(courses)
      .leftJoin(cities, eq(courses.cityId, cities.id))
      .leftJoin(countries, eq(cities.countryId, countries.id))
      .leftJoin(courseCategories, eq(courses.id, courseCategories.courseId))
      .leftJoin(categories, eq(courseCategories.categoryId, categories.id))
      .groupBy(courses.id);

    if (whereClause) {
      countQuery = countQuery.where(whereClause) as any;
    }

    if (filters.categoryIds?.length) {
      countQuery = countQuery.having(
        sql`EXISTS (
        SELECT 1
        FROM ${courseCategories}
        WHERE ${courseCategories.courseId} = ${courses.id}
          AND ${inArray(courseCategories.categoryId, filters.categoryIds)}
      )`,
      ) as any;
    }

    const result = await countQuery;
    return result[0]?.count || 0;
  }
}
