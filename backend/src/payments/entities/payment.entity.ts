/* eslint-disable prettier/prettier */

import { Exclude } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  tx_ref: string;

  @Column()
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column('json')
  items: { name: string; price: number; quantity: number; total: number }[];

  @Column('decimal')
  amount: number;






  
  
    @Column({ nullable: true })
        @Exclude()
        userId: number;
    
        @OneToOne(() => User, (user) => user.order, { eager: true })
        @JoinColumn({
            name: 'userId',
            referencedColumnName: 'id'
        })
        user: User;
  

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
