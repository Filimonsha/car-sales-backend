import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany} from "typeorm";
import {Brand} from "./Brand.js";
import {Model} from "./Model";
import {Status} from "./Status";
import {Configuration} from "./Configuration";

@Entity()
export class Car extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('boolean')
    showOnMain: boolean;
    @Column('int')
    rating: number;
    @Column('varchar')
    manufactureCountry: string;
    @Column({type: 'smallint', nullable: true})
    yearOfProduction: number;
    @ManyToOne(() => Brand, brand => brand.cars)
    brand: Brand;
    @ManyToOne(() => Model, model => model.car)
    model: Model;
    @ManyToOne(() => Status, status => status.cars)
    status: Status;
    @ManyToOne(() => Configuration)
    configuration: Configuration;
}