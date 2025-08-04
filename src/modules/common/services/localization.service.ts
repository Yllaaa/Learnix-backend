import { Injectable } from '@nestjs/common';
import { Language } from '../enums/language.enum';

@Injectable()
export class LocalizationService {
  getLocalizedField<T>(
    obj: T,
    fieldPrefix: string,
    lang: Language,
    fallbackLang: Language = Language.EN,
  ): string | null {
    const langField = `${fieldPrefix}${lang.charAt(0).toUpperCase()}${lang.slice(1)}`;
    const fallbackField = `${fieldPrefix}${fallbackLang.charAt(0).toUpperCase()}${fallbackLang.slice(1)}`;

    return obj[langField] || obj[fallbackField] || null;
  }

  transformCourseForLanguage(course: any, lang: Language): any {
    return {
      ...course,
      title: this.getLocalizedField(course, 'title', lang),
      description: this.getLocalizedField(course, 'description', lang),
      category: {
        ...course.category,
        name: this.getLocalizedField(course.category, 'name', lang),
      },
      country: course.country
        ? {
            ...course.country,
            name:
              lang === Language.AR
                ? course.country.nameEr
                : course.country.name,
          }
        : null,
      city: course.city
        ? {
            ...course.city,
            name: lang === Language.AR ? course.city.nameEr : course.city.name,
          }
        : null,
    };
  }
}
