import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Car } from './Car';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Car, car => car.model)
  cars: Car[];
}