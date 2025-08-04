import { Injectable } from '@nestjs/common';
import { and, or, gte, lte, ilike, eq } from 'drizzle-orm';
import { DrizzleService } from 'src/modules/drizzle/drizzle.service';
import { courses, countries, cities } from 'src/modules/drizzle/schemas/schema';

export interface CourseFilters {
  search?: string;
  priceFrom?: number;
  priceTo?: number;
  cityId?: number;
}

@Injectable()
export class CourseQueryBuilder {
  constructor(private readonly drizzleService: DrizzleService) {}

  private get baseQuery() {
    return this.drizzleService.db
      .select({
        id: courses.id,
        title: courses.title,
        description: courses.description,
        startDate: courses.startDate,
        price: courses.price,
        countryId: courses.countryId,
        cityId: courses.cityId,
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
      .leftJoin(cities, eq(courses.cityId, cities.id));
  }

  withSearch(query: any, search?: string) {
    if (!search) return query;

    return query.where(
      or(
        ilike(courses.title, `%${search}%`),
        ilike(courses.description, `%${search}%`),
      ),
    );
  }

  withPriceRange(query: any, priceFrom?: number, priceTo?: number) {
    const conditions: any[] = [];

    if (priceFrom !== undefined) {
      conditions.push(gte(courses.price, priceFrom));
    }

    if (priceTo !== undefined) {
      conditions.push(lte(courses.price, priceTo));
    }

    return conditions.length > 0 ? query.where(and(...conditions)) : query;
  }

  withCityId(query: any, cityId?: number) {
    if (!cityId) return query;
    return query.where(eq(courses.cityId, cityId));
  }

  withCountryId(query: any, countryId?: number) {
    if (!countryId) return query;
    return query.where(eq(courses.countryId, countryId));
  }

  findWithFilters(filters: CourseFilters = {}) {
    let query = this.baseQuery;

    query = this.withSearch(query, filters.search);
    query = this.withPriceRange(query, filters.priceFrom, filters.priceTo);
    query = this.withCityId(query, filters.cityId);

    return query;
  }
}
