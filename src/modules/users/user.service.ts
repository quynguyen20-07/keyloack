import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseList, ResponseItem } from 'src/common/dto/response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<ResponseList<UserEntity>> {
    const users = await this.userRepository
      .createQueryBuilder('users')
      .getMany();

    return new ResponseList(users, 'Thành công');
  }

  async getUser(id: number): Promise<ResponseItem<UserEntity>> {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .where('users.id = :id', { id })
      .getOne();

    if (!user) {
      throw new BadRequestException('Không nguoi dung nay');
    }

    return new ResponseItem(user, 'Thành công');
  }

  async createUser(params: CreateUserDto): Promise<ResponseItem<UserEntity>> {
    const nameExisted = await this.userRepository
      .createQueryBuilder('users')
      .where('LOWER(users.email) = LOWER(:email)', { email: params.email })
      .getOne();
    if (nameExisted) throw new BadRequestException('Email đã tồn tại');

    const user = this.userRepository.create(params);

    const newUser = await this.userRepository.save(user);

    return new ResponseItem(newUser, 'Tạo mới dữ liệu thành công');
  }

  async updateUser(
    id: number,
    params: UpdateUserDto,
  ): Promise<ResponseItem<UpdateUserDto>> {
    const userData = await this.userRepository.findOne({ where: { id } });

    const newUser = await this.userRepository.save({
      ...userData,
      ...params,
    });

    return new ResponseItem(newUser, 'Cập nhật dữ liệu thành công');
  }

  async deleteUser(id: number): Promise<ResponseItem<UserEntity>> {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .where('users.id = :id', { id });

    if (user) {
      if (!user) {
        throw new BadRequestException('Không nguoi dung nay');
      }
    }

    await this.userRepository.softDelete(id);

    return new ResponseItem(null, 'Xóa dữ liệu thành công');
  }
}
