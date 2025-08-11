import { Injectable, NotFoundException } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import {
  CourseResponseDto,
  CourseOverviewResponseDto,
} from './dto/course-response.dto';
import { CourseFilters } from './query-builders/course.query-builder';
import { ApiPaginatedResponse } from '../common/interfaces/api-paginated-response.interface';
import { Language } from '../common/enums/language.enum';
import { LocalizationService } from '../common/services/localization.service';
import { RegisterCourseDto } from './dto/register-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    private readonly coursesRepository: CoursesRepository,
    private readonly localizationService: LocalizationService,
  ) {}

  async findAll(
    filters: CourseFilters = {},
    pagination: { page?: number; perPage?: number } = {},
    locale: string = 'en',
  ): Promise<ApiPaginatedResponse<CourseResponseDto>> {
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

  async findOne(
    id: number,
    locale: string = 'en',
  ): Promise<CourseOverviewResponseDto> {
    const course = await this.coursesRepository.findById(id);

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return this.localizeCourseOverview(course, locale);
  }

  async registerCourse(dto: RegisterCourseDto, id: number) {
    return this.coursesRepository.register(dto, id);
  }

  async getCourseCategories(
    locale: string = 'en',
  ): Promise<{ id: number; name: string }[]> {
    const categories = await this.coursesRepository.getCourseCategories();
    return categories.map((category) => ({
      id: category.id,
      name: this.localizationService.getLocalizedName(category, locale),
    }));
  }

  private localizeCourse(course: any, locale: string): CourseResponseDto {
    return {
      id: course.id,
      title: this.localizationService.getLocalizedTitle(course, locale),
      description: this.localizationService.getLocalizedDescription(
        course,
        locale,
      ),
      startDate: course.startDate,
      price: course.price,
      category: course.category
        ? {
            id: Number(course.category.id),
            name: this.localizationService.getLocalizedName(
              course.category,
              locale,
            ),
          }
        : {
            id: 0,
            name: '',
          },
      country: course.country
        ? {
            id: course.country.id,
            name: this.localizationService.getLocalizedName(
              course.country,
              locale,
            ),
          }
        : null,
      city: course.city
        ? {
            id: course.city.id,
            name: this.localizationService.getLocalizedName(
              course.city,
              locale,
            ),
          }
        : null,
    };
  }

  private localizeCourseOverview(
    course: any,
    locale: string,
  ): CourseOverviewResponseDto {
    return {
      id: course.id,
      title: this.localizationService.getLocalizedTitle(course, locale),
      description: this.localizationService.getLocalizedDescription(
        course,
        locale,
      ),
      startDate: course.startDate,
      price: course.price,
      category: course.category
        ? {
            id: Number(course.category.id),
            name: this.localizationService.getLocalizedName(
              course.category,
              locale,
            ),
          }
        : null,
      trainers:
        course.trainers?.map((trainerRelation: any) => ({
          id: trainerRelation.trainer.id,
          name: this.localizationService.getLocalizedName(
            trainerRelation.trainer,
            locale,
          ),
          title: this.localizationService.getLocalizedTitle(
            trainerRelation.trainer,
            locale,
          ),
          linkedIn: trainerRelation.trainer.linkedIn,
        })) || [],
      curriculums:
        course.curriculums?.map((curriculum: any) => ({
          id: curriculum.id,
          name: this.localizationService.getLocalizedName(curriculum, locale),
          description: this.localizationService.getLocalizedDescription(
            curriculum,
            locale,
          ),
        })) || [],
      city: course.city
        ? {
            id: course.city.id,
            name: this.localizationService.getLocalizedName(
              course.city,
              locale,
            ),
            country: course.city.country
              ? {
                  id: course.city.country.id,
                  name: this.localizationService.getLocalizedName(
                    course.city.country,
                    locale,
                  ),
                }
              : null,
          }
        : null,
    };
  }
}
