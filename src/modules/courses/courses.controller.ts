import { Controller, Get, Query } from '@nestjs/common';
import { CourseQueryDto } from './dto/course-query.dto';
import { CourseResponseDto } from './dto/course-response.dto';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async searchCourses(
    @Query() query: CourseQueryDto,
  ): Promise<CourseResponseDto[]> {
    return this.coursesService.findAll(query);
  }
}
