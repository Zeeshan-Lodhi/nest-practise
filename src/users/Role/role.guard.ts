import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/Decorator/role.decorator';
import * as jwt from 'jsonwebtoken';
import { Role } from './user.role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userRoles = this.extractUserRolesFromToken(request);

    if (!userRoles) {
      return false;
    }
    if (requiredRoles.some((role) => userRoles.includes(role)) === false) {
      throw new UnauthorizedException({
        message: "You don't have access to this resource",
        statusCode: 403,
      });
    }
    return requiredRoles.some((role) => userRoles.includes(role));
  }

  private extractUserRolesFromToken(request: Request): string | null {
    const authHeader = request.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7); // Remove 'Bearer ' from the beginning

      try {
        const decodedToken = jwt.verify(token, process.env.SECRET) as {
          role: string;
        }; // Replace with your JWT secret key
        return decodedToken.role || '';
      } catch (error) {
        // Handle token validation errors (e.g., expired or invalid token)
        return null;
      }
    }

    return null;
  }
}
