import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DriveType} from "./DriveType";
import {EngineType} from "./EngineType";
import {Car} from "./Car";
import {Model} from "./Model";

@Entity()
export class Configuration extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('varchar')
    configuration: string;
    @Column('boolean')
    showPriceFrom: boolean;
    @Column('float')
    priceCar: number;
    @Column('float')
    acceleration: number;
    @Column({type: 'float', nullable: true})
    battery: number
    @Column('int')
    powerCar: number
    @Column({type: 'float', nullable: true})
    range: number
    @Column({type: 'varchar', nullable: true})
    gearBox: string;
    @Column('varchar')
    exteriorColor: string;
    @Column('varchar')
    interiorColor: string;
    @Column({type: 'int', nullable: true})
    maxTorque: number
    @Column('int')
    maxPower: number
    @Column('varchar')
    breakType: string;
    @Column('varchar')
    typeSuspension: string;
    @ManyToOne(() => EngineType, engineType => engineType.configurations)
    engineType: EngineType
    @ManyToOne(() => Model, model => model.configurations)
    model: Model;
    @ManyToOne(() => DriveType, driveType => driveType.configurations)
    driveType: DriveType
    @OneToMany(() => Car, car => car.configuration)
    cars: Car[];
}