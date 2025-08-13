/* eslint-disable prettier/prettier */
import {
  BeforeInsert,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRoles } from '../user-roles';
import { Order } from 'src/payments/entities/payment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: null })
  photo: string;

  @Column({ default: null })
  bio: string;

  @Column({ default: null })
  telegram: string;

  @Column({ default: null })
  instagram: string;

  @Column({ default: null })
  linkedin: string;

  @Column({ default: null })
  twitter: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.Reader,
  })

  @OneToOne(() => Order, (order) => order.userId)
  order: Order[];

  roles: UserRoles;
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
