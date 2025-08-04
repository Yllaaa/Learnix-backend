import { Injectable } from '@nestjs/common';
import {
  CourseQueryBuilder,
  CourseFilters,
} from './query-builders/course.query-builder';

@Injectable()
export class CoursesRepository {
  constructor(private readonly courseQueryBuilder: CourseQueryBuilder) {}

  async findAll(
    filters: CourseFilters = {},
    pagination?: { page?: number; perPage?: number },
  ): Promise<{ data: any[]; total: number }> {
    const [data, total] = await Promise.all([
      this.courseQueryBuilder.findWithFilters(filters, pagination),
      this.courseQueryBuilder.count(filters),
    ]);

    return { data, total };
  }
}
