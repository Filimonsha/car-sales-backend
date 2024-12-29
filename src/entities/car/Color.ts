import {BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Configuration} from "./Configuration";

@Entity()
export class Color extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    colorName: string;

    @Column('varchar')
    colorValue: string;

    @ManyToMany(() => Configuration, config => config.exteriorColors)
    configurationsExteriorColors: Configuration[];
    @ManyToMany(() => Configuration, config => config.interiorColors)
    configurationsInteriorColors: Configuration[];
}