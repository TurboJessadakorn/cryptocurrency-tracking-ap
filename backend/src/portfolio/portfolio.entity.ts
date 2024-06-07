import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cryptocurrency: string;

  @Column({ default: '' })
  logo: string;

  @Column({ default: '' })
  symbol: string;

  @Column('decimal')
  amount: number;

  @Column('decimal')
  purchasePrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.portfolios)
  user: User;
}