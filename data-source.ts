import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User"

export const AppDataSource:DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1956",
    database: "car-sales",
    synchronize: true,
    logging: false,
    entities: ['./entities/**/*{.ts,.js}'],
    migrations: [],
    subscribers: [],
})
