import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { GenderEnums, StatusEnum } from 'src/common/Constant/enums';

export class UpdateUserDto {
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
  gender: GenderEnums;

  @Expose()
  identityId: string;

  @Expose()
  roleId: number;

  @Expose()
  avatar: string;
}
