import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { GenderEnums, StatusEnum } from 'src/common/Constant/enums';
import { RoleEntity } from 'src/modules/roles/entities';

export class CreateUserDto {
  @Expose()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsNotEmpty()
  phone: string;

  @Expose()
  @IsNotEmpty()
  password: string;

  @Expose()
  status: StatusEnum;

  @Expose()
  @IsNotEmpty()
  fullname: string;

  @Expose()
  dateOfBirth: Date;

  @Expose()
  address: string;

  @Expose()
  @Transform(({ value }) => {
    return value ?? GenderEnums.MALE;
  })
  gender: GenderEnums;

  @Expose()
  identityId: string;

  @Expose()
  roleId: RoleEntity;

  @Expose()
  avatar: string;
}
