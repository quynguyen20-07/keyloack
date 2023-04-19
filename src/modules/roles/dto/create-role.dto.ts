import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNotEmpty()
  code: string;

  @Expose()
  description: string;
}
