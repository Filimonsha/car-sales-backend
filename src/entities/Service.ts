import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TypeOfSerivce} from "./TypeOfSerivce";

@Entity()
export class Service extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int', nullable: true})
    rating: number;
    @Column({type: 'varchar'})
    photoOfService: string;
    @Column({type: 'varchar'})
    service: string
    @Column('int')
    priceOfService: number;
    @ManyToOne(() => TypeOfSerivce, typeOfService => typeOfService.services)
    typeOfService:Service
}