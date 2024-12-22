// import { DataSource } from 'typeorm';
// import { Car } from '../entities/car/Car.js';
// import { Brand } from '../entities/car/Brand.js';
// import { Photo } from 'src/entities/Photo.js';

import {DataSource} from "typeorm";
import {Brand} from "../entities/car/Brand";
import {Car} from "../entities/car/Car";
import {Photo} from "../entities/Photo";
import {Model} from "../entities/car/Model";
import {Status} from "../entities/car/Status";
import {Configuration} from "../entities/car/Configuration";
import {DriveType} from "../entities/car/DriveType";
import {EngineType} from "../entities/car/EngineType";

export const AppDataSource: DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1956",
    database: "postgres",
    synchronize: true,
    logging: false,
    // entities: ['../entities/**/*{.ts,.js}'],
    entities: [Car, Brand, Model, Status, Configuration, DriveType, EngineType],
    migrations: [],
    subscribers: [],
})

// export default new DataSource(config);
