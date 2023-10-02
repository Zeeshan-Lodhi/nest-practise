import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { post } from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([post])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
