import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Car } from './Car';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Car, car => car.brand)
  cars: Car[];
}