import { User } from 'src/users/user.entity';
import { ClientContact } from 'src/client-contacts/entities/client-contact.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
  })
  id!: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  companyName!: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  logoUrl?: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  country?: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  city?: string;

  //   @Column({
  //     type: 'varchar',
  //     length: 150,
  //     nullable: true,
  //   })
  //   businessType?: string;

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
    length: 255,
    nullable: true,
  })
  password?: string;

  //   @Column({
  //     type: 'varchar',
  //     length: 500,
  //     nullable: true,
  //   })
  //   website?: string;

  //   @ManyToOne(() => LookupValue)
  //   status!: LookupValue;

  //   @Column({
  //     type: 'text',
  //     nullable: true,
  //   })
  //   internalNotes?: string;

  @ManyToOne(() => User)
  createdBy?: User;

  @OneToMany(() => ClientContact, (contact) => contact.client)
  contacts!: ClientContact[];

  @CreateDateColumn()
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
