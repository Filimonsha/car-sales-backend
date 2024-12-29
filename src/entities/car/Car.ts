import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, JoinTable} from "typeorm";
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
    @Column({type: 'int', nullable: true})
    rating: number;
    @Column({type: 'boolean'})
    onStock: boolean;
    @Column('varchar')
    manufactureCountry: string;
    @Column({type: 'smallint', nullable: true})
    yearOfProduction: number;
    @ManyToOne(() => Brand, brand => brand.cars, {nullable: false})
    brand: Brand;
    @ManyToOne(() => Model, model => model.cars, {nullable: false})
    model: Model;
    @ManyToOne(() => Status, status => status.cars, {nullable: false})
    status: Status;
    @ManyToOne(() => Configuration, configuration => configuration.cars, {nullable: false})
    configuration: Configuration;
}