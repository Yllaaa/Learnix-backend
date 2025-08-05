import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './modules/drizzle/drizzle.module';
import { CoursesModule } from './modules/courses/courses.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LocaleInterceptor } from './modules/common/interceptors/language.interceptor';
import { TrainersModule } from './modules/trainers/trainers.module';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [
    DrizzleModule,
    CoursesModule,
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TrainersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LocaleInterceptor,
    },
  ],
})
export class AppModule {}
