import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const lang = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const acceptLanguage = request.headers['accept-language'] || 'en';

    const primaryLanguage = acceptLanguage
      .split(',')[0]
      .split('-')[0]
      .toLowerCase();

    return ['ar', 'en'].includes(primaryLanguage) ? primaryLanguage : 'en';
  },
);
