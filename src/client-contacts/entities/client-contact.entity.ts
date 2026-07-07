import { Client } from 'src/clients/client.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('client_contacts')
export class ClientContact {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
  })
  id!: string;

  @ManyToOne(() => Client, (client) => client.contacts, {
    onDelete: 'CASCADE',
  })
  client!: Client;

  @Column({
    type: 'varchar',
    length: 200,
  })
  fullName!: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  phone?: string;

  @Column({
    type: 'varchar',
    length: 320,
    nullable: true,
  })
  email?: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  whatsapp?: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isPrimaryContact!: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  isPortalUser!: boolean;

  @CreateDateColumn({})
  createdAt!: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    nullable: true,
  })
  deletedAt?: Date;
}
