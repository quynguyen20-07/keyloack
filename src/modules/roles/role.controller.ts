import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'nestjs-keycloak';

import { RoleService } from './role.service';
import { ResponseItem, ResponseList } from 'src/common/dto/response.dto';
import { RoleEntity } from './entities';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async createRole(
    @Body() params: CreateRoleDto,
  ): Promise<ResponseItem<RoleEntity>> {
    return await this.roleService.createRole(params);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getRoles(@Param() params: any): Promise<ResponseList<RoleEntity>> {
    return await this.roleService.getRoles(params);
  }

  @Get(':id')
  async getRole(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseItem<RoleEntity>> {
    return await this.roleService.getRole(id);
  }

  @Patch(':id')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateRoleDto,
  ): Promise<ResponseItem<UpdateRoleDto>> {
    return await this.roleService.updateRole(id, updateUserDto);
  }

  @Post('delete/:id')
  async deleteRole(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseItem<RoleEntity>> {
    return await this.roleService.deleteRole(id);
  }
}
