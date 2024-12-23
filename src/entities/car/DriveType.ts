import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Car} from "./Car";
import {Configuration} from "./Configuration";

@Entity()
export class DriveType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('varchar')
    driveType: string;
    @OneToMany(() => Configuration, conf => conf.driveType)
    configurations: Configuration[]
}