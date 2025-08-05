import { Global, Module } from '@nestjs/common';
import { LocalizationService } from './services/localization.service';
@Global()
@Module({
  providers: [LocalizationService],
  exports: [LocalizationService],
})
export class CommonModule {}
