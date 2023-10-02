import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(post)
    private postRepository: Repository<post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<post> {
    return this.postRepository.save(createPostDto);
  }

  findAll(): Promise<post[]> {
    return this.postRepository.find();
  }
}
