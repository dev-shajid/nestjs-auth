import { HttpCode, HttpStatus, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse, ApiResponseType } from 'src/utils/ApiResponse';
import { LoginUserDto } from './dto/login-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) { }

  async register(createUserDto: CreateUserDto): Promise<ApiResponseType<{ user: UserEntity; }>> {
    const existingUser = await this.findByEmail(createUserDto.email);

    if (existingUser) throw new NotAcceptableException('User with this email already exists');
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    delete user.password;
    return ApiResponse(HttpStatus.CREATED, 'User created successfully', { user });
  }
  
  async updateRefreshToken(id: number, refreshToken: string) {
    return await this.userRepository.update({id}, {refreshToken});
  }


  async findByEmail(email:string){
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async findAll() {
    return await this.userRepository.find();
  }



  async findOne(id: number) {
    const getUser = await this.userRepository.findOne({
      where: { id }
    });
    if(!getUser) throw new NotFoundException('User not found');
    const {password, ...user} = getUser;
    return user;
  }

  async getProfile(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({where:{id}});
    if(!user) {
      throw new Error('User not found');
    }
    await this.userRepository.update({id}, updateUserDto);
    return await this.userRepository.findOne({
      where:{id}
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
