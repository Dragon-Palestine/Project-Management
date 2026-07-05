import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CURRENT_USER_KEY } from 'src/utils/constants';
import { JWTPayloadType } from 'src/utils/types';

// CurrentUser Parameter Decorator
export const CurrentUser = createParamDecorator(
  (
    data: keyof JWTPayloadType | undefined,
    context: ExecutionContext,
  ): JWTPayloadType | JWTPayloadType[keyof JWTPayloadType] | undefined => {
    const request = context
      .switchToHttp()
      .getRequest<Request & { [CURRENT_USER_KEY]?: JWTPayloadType }>();
    const currentUser = request[CURRENT_USER_KEY];

    if (!data) {
      return currentUser;
    }

    return currentUser?.[data];
  },
);
