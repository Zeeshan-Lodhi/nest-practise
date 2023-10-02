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
import { UserService } from './users.service';
import { User } from './users.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { InterceptInterceptor } from 'src/intercept/intercept.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  //get all users
  @Get()
  // @UseGuards(AuthGuard)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  //get user by id
  @Get(':id')
  @UseInterceptors(InterceptInterceptor)
  @UsePipes(ParseIntPipe)
  async findOne(@Param('id') id: number): Promise<User> {
    if (id < 0) {
      throw new HttpException(
        'Id must be greater than zero',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  //create user
  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  //update user
  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<any> {
    return this.usersService.update(id, user);
  }

  //delete user
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    //handle error if user does not exist
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.usersService.delete(id);
  }
}
