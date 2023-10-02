import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/users/Role/user.role';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
