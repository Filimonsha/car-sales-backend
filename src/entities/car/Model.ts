import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Car } from './Car.js';

@Entity()
export class Model extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // @OneToMany(() => Car, car => car.model)
  // cars: Car[];
}