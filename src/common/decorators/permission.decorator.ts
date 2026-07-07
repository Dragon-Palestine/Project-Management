import { SetMetadata } from '@nestjs/common';
import { PERMISSION_KEY } from 'src/utils/constants';

export const RequirePermission = (permission: string) =>
  SetMetadata(PERMISSION_KEY, permission);
