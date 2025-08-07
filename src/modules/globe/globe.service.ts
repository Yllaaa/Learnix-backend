import { Injectable } from '@nestjs/common';
import { ApiPaginatedResponse } from '../common/interfaces/api-paginated-response.interface';
import { GlobeRepository } from './globe.repository';
import { Language } from '../common/enums/language.enum';
import { LocalizationService } from '../common/services/localization.service';
import { CityResponseDto, CountryResponseDto } from './dto/globe-response.dto';
@Injectable()
export class GlobeService {
  constructor(
    private readonly globeRepository: GlobeRepository,
    private readonly localizationService: LocalizationService,
  ) {}

  async findCities(
    countryId?: number,
    search?: string,
    pagination: { page?: number; perPage?: number } = {},
    locale: string = 'en',
  ): Promise<ApiPaginatedResponse<CityResponseDto>> {
    const page = pagination.page || 1;
    const perPage = Math.min(pagination.perPage || 10, 100);

    const { data, total } = await this.globeRepository.findCities({
      page,
      perPage,
      countryId,
      search,
    });

    const localizedData = data.map((city) => this.localizeCity(city, locale));

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

  private localizeCity(city: any, locale: string): CityResponseDto {
    const localizedCity: CityResponseDto = {
      id: city.id,
      name: this.localizationService.getLocalizedName(city, locale),
      countryId: city.countryId,
    };

    return localizedCity;
  }
  async findCountries(
    search?: string,
    pagination: { page?: number; perPage?: number } = {},
    locale: string = 'en',
  ): Promise<ApiPaginatedResponse<CountryResponseDto>> {
    const page = pagination.page || 1;
    const perPage = Math.min(pagination.perPage || 10, 100);

    const { data, total } = await this.globeRepository.findCountries({
      page,
      perPage,
      search,
    });

    const localizedData = data.map((country) =>
      this.localizeCountry(country, locale),
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

  private localizeCountry(country: any, locale: string): CountryResponseDto {
    return {
      id: country.id,
      name: this.localizationService.getLocalizedName(country, locale),
      iso: country.iso,
    };
  }
}
