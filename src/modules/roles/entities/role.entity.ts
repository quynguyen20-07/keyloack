import { AbstractEntity } from 'src/common/interfaces/abstract-class.entity';
import { UserEntity } from 'src/modules/users/entities';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

@Entity('roles')
export class RoleEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 25 })
  name: string;

  @Column({ type: 'varchar', length: 25 })
  code: string;

  @Column({ type: 'varchar', nullable: true, length: 200 })
  description: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  @JoinColumn()
  users: UserEntity[];
}
