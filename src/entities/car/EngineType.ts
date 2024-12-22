import {BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Configuration} from "./Configuration";

@Entity()
export class EngineType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @OneToMany(() => Configuration, conf => conf.driveType)
    configurations: Configuration[]
}