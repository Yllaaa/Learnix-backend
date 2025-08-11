import {
  Controller,
  Get,
  Query,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { CourseQueryDto } from './dto/course-query.dto';
import {
  CourseResponseDto,
  CourseOverviewResponseDto,
} from './dto/course-response.dto';
import { CoursesService } from './courses.service';
import { lang } from '../common/decorators/lang.decorator';
import { ApiPaginatedResponse } from '../common/interfaces/api-paginated-response.interface';
import { RegisterCourseDto } from './dto/register-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async searchCourses(
    @Query() query: CourseQueryDto,
    @lang() lang: string,
  ): Promise<ApiPaginatedResponse<CourseResponseDto>> {
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
  ): Promise<CourseOverviewResponseDto> {
    return this.coursesService.findOne(id, lang);
  }

  @Post(':id/register')
  async apply(@Body() dto: RegisterCourseDto, @Param('id') id: number) {
    return this.coursesService.registerCourse(dto, id);
  }
}
