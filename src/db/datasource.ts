import { DataSource } from 'typeorm';
import { Car } from '../entities/car/Car';
import { Brand } from '../entities/car/Brand';

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
    entities: [Car,Brand],
    migrations: [],
    subscribers: [],
})

// export default new DataSource(config);
