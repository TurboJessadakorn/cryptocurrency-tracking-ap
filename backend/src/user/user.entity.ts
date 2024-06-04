import { Entity, Column, ObjectIdColumn, OneToMany, ObjectId, PrimaryGeneratedColumn } from 'typeorm';
import { Portfolio } from 'src/portfolio/portfolio.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
  @OneToMany(() => Portfolio, portfolio => portfolio.user)
  portfolios: Portfolio[];
}
