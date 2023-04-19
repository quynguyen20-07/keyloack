import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseItem, ResponseList } from 'src/common/dto/response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUsers(
    @Body() params: CreateUserDto,
  ): Promise<ResponseItem<UserEntity>> {
    return await this.userService.createUser(params);
  }

  @Get()
  async getUsers(): Promise<ResponseList<UserEntity>> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseItem<UserEntity>> {
    return await this.userService.getUser(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseItem<UpdateUserDto>> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Post('delete/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseItem<UserEntity>> {
    return await this.userService.deleteUser(id);
  }
}
