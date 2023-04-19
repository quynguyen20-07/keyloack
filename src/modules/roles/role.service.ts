import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleEntity } from './entities';
import { ResponseItem, ResponseList } from 'src/common/dto/response.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { StatusEnum } from 'src/common/Constant/enums';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async createRole(params: CreateRoleDto): Promise<ResponseItem<RoleEntity>> {
    const nameExisted = await this.roleRepository.findOneBy({
      name: params.name,
      deletedAt: null,
    });

    if (nameExisted) throw new BadRequestException('Vai tro đã tồn tại');

    const role = this.roleRepository.create(params);

    const newRole = await this.roleRepository.save(role);

    return new ResponseItem(newRole, 'Tạo mới dữ liệu thành công');
  }

  async getRoles(params: any): Promise<ResponseList<RoleEntity>> {
    const roles = await this.roleRepository
      .createQueryBuilder('roles')
      .where('roles.status = ANY(:status)', {
        status: params.status
          ? [params.status]
          : [StatusEnum.ACTIVE, StatusEnum.INACTIVE],
      })
      .getMany();

    return new ResponseList(roles, 'Thành công');
  }

  async getRole(id: number): Promise<ResponseItem<RoleEntity>> {
    const role = await this.roleRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!role) {
      throw new BadRequestException('Vai tro nay khong ton tai');
    }

    return new ResponseItem(role, 'Thành công');
  }

  async updateRole(
    id: number,
    params: UpdateRoleDto,
  ): Promise<ResponseItem<UpdateRoleDto>> {
    const role = await this.roleRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });

    const newRole = await this.roleRepository.save({
      ...role,
      ...params,
    });

    return new ResponseItem(newRole, 'Cập nhật dữ liệu thành công');
  }

  async deleteRole(id: number): Promise<ResponseItem<RoleEntity>> {
    const role = await this.roleRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!role) {
      throw new BadRequestException('Vai tro nay khong ton tai');
    }

    await this.roleRepository.softDelete(id);

    return new ResponseItem(null, 'Xóa dữ liệu thành công');
  }
}
