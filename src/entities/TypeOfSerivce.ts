import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Service} from "./Service";

@Entity()
export class TypeOfSerivce extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    typeOfService: string;

    @OneToMany(() => Service, service => service.typeOfService)
    services: Service[]
}