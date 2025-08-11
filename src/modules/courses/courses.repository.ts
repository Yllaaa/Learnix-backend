import { Injectable } from '@nestjs/common';
import {
  CourseQueryBuilder,
  CourseFilters,
} from './query-builders/course.query-builder';
import { DrizzleService } from '../drizzle/drizzle.service';
import { RegisterCourseDto } from './dto/register-course.dto';
import { courseRegisteration } from '../drizzle/schemas/schema';
@Injectable()
export class CoursesRepository {
  constructor(
    private readonly courseQueryBuilder: CourseQueryBuilder,
    private readonly drizzleService: DrizzleService,
  ) {}

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

  async findById(id: number) {
    const course = await this.drizzleService.db.query.courses.findFirst({
      where: (courses, { eq }) => eq(courses.id, id),
      with: {
        trainers: {
          with: {
            trainer: {
              columns: {
                id: true,
                nameEn: true,
                nameAr: true,
                titleEn: true,
                titleAr: true,
                linkedIn: true,
                trainerPicture: true,
              },
            },
          },
        },
        city: {
          columns: {
            id: true,
            nameEn: true,
            nameAr: true,
          },
          with: {
            country: {
              columns: {
                id: true,
                nameEn: true,
                nameAr: true,
                iso: true,
              },
            },
          },
        },
        categories: {
          columns: {},
          with: {
            category: {
              columns: {
                id: true,
                nameEn: true,
                nameAr: true,
              },
            },
          },
        },
        curriculums: {
          columns: {
            id: true,
            nameEn: true,
            nameAr: true,
            descriptionEn: true,
            descriptionAr: true,
          },
        },
        outcomes: {
          columns: {
            id: true,
            titleEn: true,
            titleAr: true,
            descriptionAr: true,
            descriptionEn: true,
          },
        },
      },
      columns: {
        id: true,
        titleEn: true,
        titleAr: true,
        descriptionEn: true,
        descriptionAr: true,
        startDate: true,
        price: true,
      },
    });

    return course || null;
  }

  async getCourseCategories(): Promise<any[]> {
    return this.drizzleService.db.query.categories.findMany({
      columns: {
        id: true,
        nameEn: true,
        nameAr: true,
      },
    });
  }

  async register(dto: RegisterCourseDto, id: number) {
    const [registration] = await this.drizzleService.db
      .insert(courseRegisteration)
      .values({
        ...dto,
        courseId: id,
      })
      .returning();

    return registration;
  }
}
