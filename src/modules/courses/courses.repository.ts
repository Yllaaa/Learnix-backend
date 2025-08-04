import { Injectable } from '@nestjs/common';
import {
  CourseQueryBuilder,
  CourseFilters,
} from './query-builders/course.query-builder';
import { CourseResponseDto } from './dto/course-response.dto';

@Injectable()
export class CoursesRepository {
  constructor(private readonly courseQueryBuilder: CourseQueryBuilder) {}

  async findAll(filters: CourseFilters = {}): Promise<CourseResponseDto[]> {
    const query = await this.courseQueryBuilder.findWithFilters(filters);
    return query as CourseResponseDto[];
  }
}
