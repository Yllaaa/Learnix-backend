import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { CourseQueryDto } from './dto/course-query.dto';
import {
  LocalizedCourseResponseDto,
  LocalizedCourseDetailResponseDto,
} from './dto/course-response.dto';
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

  @Get('categories')
  async getCourseCategories(
    @lang() lang: string,
  ): Promise<{ id: number; name: string }[]> {
    console.log('Fetching course categories');
    return this.coursesService.getCourseCategories(lang);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @lang() lang: string,
  ): Promise<LocalizedCourseDetailResponseDto> {
    return this.coursesService.findOne(id, lang);
  }
}
