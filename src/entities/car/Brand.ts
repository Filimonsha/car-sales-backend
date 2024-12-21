import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Car } from './Car.js';

@Entity()
export class Brand extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  carName: string;

  @OneToMany(() => Car, car => car.brand)
  cars: Car[];
}