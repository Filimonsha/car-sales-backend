import { DataSource } from 'typeorm';
import { Car } from '../entities/car/Car.js';
import { Brand } from '../entities/car/Brand.js';
import { Photo } from 'src/entities/Photo.js';

export const AppDataSource:DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1956",
    database: "car-sales",
    synchronize: true,
    logging: false,
    // entities: ['../entities/**/*{.ts,.js}'],
    entities: [Car,Brand,Photo],
    migrations: [],
    subscribers: [],
})

// export default new DataSource(config);
