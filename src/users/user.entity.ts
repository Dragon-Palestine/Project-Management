import { Role } from 'src/roles/entitys/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// import { CURRENT_TIMESTAMP } from '../util/constants';
// import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  userName!: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email!: string;

  @Column()
  //@Exclude()
  password!: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date;

  @ManyToOne(() => Role, (role) => role.users)
  role!: Role;
}
