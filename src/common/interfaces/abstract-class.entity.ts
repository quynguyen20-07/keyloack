import {
  BeforeInsert,
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', default: 'active' })
  status: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  generateId() {
    this.id = Date.now();
  }
}
