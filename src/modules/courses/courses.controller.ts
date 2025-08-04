import { Controller, Get, Query } from '@nestjs/common';
import { CourseQueryDto } from './dto/course-query.dto';
import { LocalizedCourseResponseDto } from './dto/course-response.dto';
import { CoursesService } from './courses.service';
import { lang } from '../common/decorators/lang.decorator';
import { PaginatedResponse } from '../common/interfaces/paginated-response.interface';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async searchCourses(
    @Query() query: CourseQueryDto,
    @lang() lang: string,
  ): Promise<PaginatedResponse<LocalizedCourseResponseDto>> {
    const { page, perPage, ...filters } = query;
    return this.coursesService.findAll(filters, { page, perPage }, lang);
  }
}
