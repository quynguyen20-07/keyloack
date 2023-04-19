import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpdateRoleDto {
  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNotEmpty()
  code: string;

  @Expose()
  description: string;
}
