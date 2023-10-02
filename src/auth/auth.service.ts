import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }): Promise<User> {
    const findedUser = await this.userRepository.findOne({ where: { email } });
    if (findedUser?.password !== password) {
      throw new UnauthorizedException();
    }
    const user = {
      id: findedUser.id,
      email: findedUser.email,
      password: findedUser.password,
      access_token: await this.jwtService.signAsync({
        email: findedUser.email,
      }),
    };
    return user;
  }
}
