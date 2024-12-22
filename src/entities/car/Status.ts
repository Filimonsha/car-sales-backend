import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Car} from "./Car";

@Entity()
export class Status extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    status: string;

    @OneToMany(() => Car, car => car.status)
    cars: Car[]
}
