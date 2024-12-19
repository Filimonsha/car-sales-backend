import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Brand } from "./Brand";
import { Model } from "./Model";

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  carNumber: string;

  @Column()
  rating: number;

  @Column()
  brandId: number;

  @ManyToOne(() => Brand, brand => brand.cars)
  brand: Brand;

  @Column()
  modelId: number;

  @ManyToOne(() => Model, model => model.cars)
  model: Model;

//   @Column()
//   configurationId: number;

//   @ManyToOne(() => Configuration, config => config.cars)
//   configuration: Configuration;
}