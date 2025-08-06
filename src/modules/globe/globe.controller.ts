import { Controller, Get, Query } from '@nestjs/common';
import { CitiesQueryDto } from './dto/cities-query.dto';
import { lang } from '../common/decorators/lang.decorator';
import { ApiPaginatedResponse } from '../common/interfaces/api-paginated-response.interface';
import { CityResponseDto, CountryResponseDto } from './dto/globe-response.dto';
import { GlobeService } from './globe.service';
import { CountriesQueryDto } from './dto/countries-query.dto';

@Controller('globe')
export class GlobeController {
  constructor(private readonly globeService: GlobeService) {}

  @Get('cities')
  async findCities(
    @Query() query: CitiesQueryDto,
    @lang() lang: string,
  ): Promise<ApiPaginatedResponse<CityResponseDto>> {
    const { page, perPage, countryId, search } = query;

    return this.globeService.findCities(
      countryId,
      search,
      { page, perPage },
      lang,
    );
  }

  @Get('countries')
  async findAll(
    @Query() query: CountriesQueryDto,
    @lang() lang: string,
  ): Promise<ApiPaginatedResponse<CountryResponseDto>> {
    const { page, perPage, search } = query;

    return this.globeService.findCountries(search, { page, perPage }, lang);
  }
}
