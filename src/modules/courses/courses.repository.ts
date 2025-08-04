import { Injectable } from '@nestjs/common';
import {
  CourseQueryBuilder,
  CourseFilters,
} from './query-builders/course.query-builder';
import { CourseResponseDto } from './dto/course-response.dto';

@Injectable()
export class CoursesRepository {
  constructor(private readonly courseQueryBuilder: CourseQueryBuilder) {}

  async findAll(
    filters: CourseFilters = {},
    pagination?: { page?: number; perPage?: number },
  ): Promise<CourseResponseDto[]> {
    const query = await this.courseQueryBuilder.findWithFilters(
      filters,
      pagination,
    );
    return query as CourseResponseDto[];
  }
}
