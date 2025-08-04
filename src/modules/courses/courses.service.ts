import { Injectable } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import { CourseResponseDto } from './dto/course-response.dto';
import { CourseFilters } from './query-builders/course.query-builder';
@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  async findAll(
    filters: CourseFilters = {},
    pagination?: { page?: number; perPage?: number },
  ): Promise<CourseResponseDto[]> {
    const query = this.coursesRepository.findAll(filters, pagination);
    return await query;
  }
}
