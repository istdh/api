import { SetMetadata } from '@nestjs/common';
import { Roles } from 'enum';

export const HasRoles = (...roles: Roles[]) => SetMetadata('roles', roles);
