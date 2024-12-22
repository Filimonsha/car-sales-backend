import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Configuration} from "./Configuration";

@Entity()
export class EngineType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('varchar')
    engineType: string;
    @OneToMany(() => Configuration, conf => conf.driveType)
    configurations: Configuration[]
}