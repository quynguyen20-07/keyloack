import { AbstractEntity } from 'src/common/interfaces/abstract-class.entity';
import { RoleEntity } from 'src/modules/roles/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 25 })
  fullname: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  password: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  phone: string;

  @Column({ type: 'varchar', default: 'active' })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'varchar', nullable: true, length: 200 })
  address: string;

  @Column({ type: 'varchar', default: 'male' })
  gender: string;

  @Column({
    type: 'varchar',
    default:
      'https://github.com/quygcd18687/images/blob/master/user.png?raw=true',
  })
  avatar: string;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn()
  role: RoleEntity;
}
