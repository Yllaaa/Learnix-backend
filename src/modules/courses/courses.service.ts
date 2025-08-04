import { Injectable } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import { LocalizedCourseResponseDto } from './dto/course-response.dto';
import { CourseFilters } from './query-builders/course.query-builder';
import { PaginatedResponse } from '../common/interfaces/paginated-response.interface';
import { Language } from '../common/enums/language.enum';

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  async findAll(
    filters: CourseFilters = {},
    pagination: { page?: number; perPage?: number } = {},
    locale: string = 'en',
  ): Promise<PaginatedResponse<LocalizedCourseResponseDto>> {
    const page = pagination.page || 1;
    const perPage = Math.min(pagination.perPage || 10, 100);

    const { data, total } = await this.coursesRepository.findAll(filters, {
      page,
      perPage,
    });

    const localizedData = data.map((course) =>
      this.localizeCourse(course, locale),
    );

    const totalPages = Math.ceil(total / perPage);

    return {
      data: localizedData,
      meta: {
        page,
        perPage,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      lang: locale as Language,
    };
  }

  private localizeCourse(
    course: any,
    locale: string,
  ): LocalizedCourseResponseDto {
    return {
      id: course.id,
      title: locale === 'ar' ? course.titleAr : course.titleEn,
      description:
        locale === 'ar' ? course.descriptionAr : course.descriptionEn,
      startDate: course.startDate,
      price: course.price,
      category: course.category
        ? {
            id: Number(course.category.id),
            name:
              locale === 'ar'
                ? String(course.category.nameAr)
                : String(course.category.nameEn),
          }
        : {
            id: 0,
            name: '',
          },
      country: course.country
        ? {
            id: course.country.id,
            name:
              locale === 'ar' ? course.country.nameAr : course.country.nameEn,
          }
        : null,
      city: course.city
        ? {
            id: course.city.id,
            name: locale === 'ar' ? course.city.nameAr : course.city.nameEn,
          }
        : null,
    };
  }
}
