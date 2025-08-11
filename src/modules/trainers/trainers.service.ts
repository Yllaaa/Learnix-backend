import { Injectable } from '@nestjs/common';
import { TrainersRepository } from './trainers.repository';
import { ApiPaginatedResponse } from '../common/interfaces/api-paginated-response.interface';
import { Language } from '../common/enums/language.enum';
import { TrainerResponseDto } from './dto/trainer-response.dto';
import { LocalizationService } from '../common/services/localization.service';

@Injectable()
export class TrainersService {
  constructor(
    private readonly trainersRepository: TrainersRepository,
    private readonly localizationService: LocalizationService,
  ) {}

  async findAll(
    leadWeekend: boolean,
    pagination: { page?: number; perPage?: number } = {},
    locale: string = 'en',
  ): Promise<ApiPaginatedResponse<TrainerResponseDto>> {
    const page = pagination.page || 1;
    const perPage = Math.min(pagination.perPage || 10, 100);

    const { data, total } = await this.trainersRepository.findAll(leadWeekend, {
      page,
      perPage,
    });

    const localizedData = data.map((trainer) =>
      this.localizeTrainer(trainer, locale),
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

  private localizeTrainer(trainer: any, locale: string): TrainerResponseDto {
    return {
      id: trainer.id,
      name: this.localizationService.getLocalizedName(trainer, locale),
      title: this.localizationService.getLocalizedTitle(trainer, locale),
      linkedIn: trainer.linkedIn,
      leadWeekend: trainer.leadWeekend,
      trainerPicture: trainer.trainerPicture,
    };
  }
}
