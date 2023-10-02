import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  UsePipes,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { InterceptInterceptor } from 'src/intercept/intercept.interceptor';
import { User } from 'src/users/users.entity';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signIn(@Body() user: User): Promise<User> {
    return this.authService.signIn({
      email: user.email,
      password: user.password,
    });
  }
}
