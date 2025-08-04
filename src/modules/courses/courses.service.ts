import { Injectable } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import { CourseResponseDto } from './dto/course-response.dto';
import { CourseFilters } from './query-builders/course.query-builder';
@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  async findAll(filters: CourseFilters = {}): Promise<CourseResponseDto[]> {
    const query = this.coursesRepository.findAll(filters);
    return await query;
  }
}
