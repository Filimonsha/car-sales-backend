import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Brand } from "./Brand.js";
@Entity()
export class Car extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  carNumber: string;

  @Column('int')
  rating: number;


  @ManyToOne(() => Brand, brand => brand.cars)
  brand: Brand;

  // @Column()
  // modelId: number;

  // @ManyToOne(() => Model, model => model.cars)
  // model: Model;

//   @Column()
//   configurationId: number;

//   @ManyToOne(() => Configuration, config => config.cars)
//   configuration: Configuration;
}