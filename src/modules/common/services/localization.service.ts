import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalizationService {
  getLocalizedText(textEn: string, textAr: string, locale: string): string {
    return locale === 'ar' ? textAr : textEn;
  }

  getLocalizedName(
    entity: { nameEn: string; nameAr: string },
    locale: string,
  ): string {
    return locale === 'ar' ? entity.nameAr : entity.nameEn;
  }

  getLocalizedTitle(
    entity: { titleEn: string; titleAr: string },
    locale: string,
  ): string {
    return locale === 'ar' ? entity.titleAr : entity.titleEn;
  }

  getLocalizedDescription(
    entity: { descriptionEn: string; descriptionAr: string },
    locale: string,
  ): string {
    return locale === 'ar' ? entity.descriptionAr : entity.descriptionEn;
  }
}
