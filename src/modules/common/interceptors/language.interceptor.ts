import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LocaleInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const acceptLanguage = request.headers['accept-language'] || 'en';
    const primaryLanguage = acceptLanguage
      .split(',')[0]
      .split('-')[0]
      .toLowerCase();
    request.locale = ['ar', 'en'].includes(primaryLanguage)
      ? primaryLanguage
      : 'en';

    return next.handle();
  }
}
