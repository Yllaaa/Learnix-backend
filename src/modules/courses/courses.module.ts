import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CoursesRepository } from './courses.repository';
import { CourseQueryBuilder } from './query-builders/course.query-builder';

@Module({
  providers: [CoursesService, CourseQueryBuilder, CoursesRepository],
  controllers: [CoursesController],
})
export class CoursesModule {}
