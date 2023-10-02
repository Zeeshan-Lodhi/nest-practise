import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { post } from './entities/post.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/Decorator/role.decorator';
import { Role } from 'src/users/Role/user.role';
import { RolesGuard } from 'src/users/Role/role.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  create(@Body() createPostDto: CreatePostDto): Promise<post> {
    return this.postService.create(createPostDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.postService.findAll();
  }
}
