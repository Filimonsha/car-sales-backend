import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import {Car} from './Car.js';
import {Configuration} from "./Configuration";

@Entity()
export class Model extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'varchar'})
    base64ImageSrc: string;
    @Column({type: 'varchar', array:true,        nullable: true})
    galleryImages: string[];
    @Column({type: 'varchar', unique: true})
    modelCar: string;
    @Column('int')
    maxSpeed: number;
    @Column('float')
    fuelEconomy: number;
    @Column('int')
    length: number;
    @Column('int')
    width: number;
    @Column('int')
    height: number;
    @Column('int')
    doorsCount: number;
    @Column('int')
    seatCount: number;
    @Column('int')
    bagSpace: number;
    @Column('int')
    maxWeight: number;
    @Column('int')
    wheelBase: number;
    @Column('int')
    clearance: number;
    @OneToMany(() => Configuration, conf => conf.model)
    configurations: Car[];
    @OneToMany(() => Car, car => car.model)
    cars: Car[];
}