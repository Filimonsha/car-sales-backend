import {NextFunction} from "express";
// import {AppDataSource} from "./src/db/datasource";
// import {Brand} from "src/entities/car/Brand";
// import {Car} from "src/entities/car/Car";
import {Repository} from "typeorm";
import type {Request, Response} from 'express'
import {Car} from "../entities/car/Car";
import {Brand} from "../entities/car/Brand";
import {AppDataSource} from "../db/datasource";
import cars from "../routes/cars.router";

class CarSerivce {
    carRepository: Repository<Car>;
    brandRepository: Repository<Brand>;

    constructor() {
        this.carRepository = AppDataSource.getRepository(Car);
        this.brandRepository = AppDataSource.getRepository(Brand)
    }

    public getAllCars = async (sort?: string[], filter?: string) => {
        // const queryBuilder = this.carRepository.createQueryBuilder();
        // queryBuilder
        //     .skip(skip)
        //     .take(take)
        // const itemCount = await queryBuilder.getCount();
        // const {entities} = await queryBuilder.getRawAndEntities();
        // TODO
        let foundCars = await this.carRepository.find({
            loadRelationIds: true
        });
        if (sort) {
            foundCars = this.customSort(sort, foundCars);
        }

        return foundCars;
    };

    private customSort(sort: string[], foundCars: Car[]) {
        if (sort) {
            foundCars = foundCars.sort((a, b) => {
                const sortingField = sort[0].split('.');
                console.log(sortingField, sortingField[0], a[sortingField[0]])
                let firstObj
                let secondObj
                if (sortingField.length > 1) {
                    firstObj = String(a[sortingField[0]][sortingField[1]])
                    firstObj = String(b[sortingField[0]][sortingField[1]])
                } else {
                    firstObj = String(a[sortingField[0]]);
                    secondObj = String(b[sortingField[0]]);
                }
                return firstObj.localeCompare(secondObj, undefined, {numeric: true})
            })
            if (sort.includes("DESC")) {
                foundCars = foundCars.reverse()
            }
        }
        return foundCars;
    }

    public getAllCarsWithRelations = async (req) => {
        const {loadFullInfo, sort, ...filters} = req.query
        let foundCars = await this.carRepository.find({
            relations: ['model', 'brand', 'status', 'configuration.engineType', 'configuration.driveType']
        });

        if (filters) {

            if (filters.engineType) {
                foundCars = foundCars.filter(car => car.configuration.engineType.engineType === filters.engineType)
            }
            if (filters.onStock !== undefined && filters.onStock !== null) {
                foundCars = foundCars.filter(car => {
                    console.log(Boolean(filters.onStock), car.onStock)
                    console.log(car.onStock === Boolean(filters.onStock))
                    console.log("--------------------")
                    return car.onStock === JSON.parse(filters.onStock)
                })
            }
            if (filters.status) {
                foundCars = foundCars.filter(car => car.status.status === filters.status)
            }
            // foundCars = foundCars.filter(car => {
            //     let isValid = true;
            //
            //     for (let key in filters) {
            //         console.log(key, car[key], filters[key]);
            //         console.log(isValid,car[key] === filters[key])
            //
            //         isValid = isValid && (car[key] === filters[key]);
            //     }
            //     return isValid;
            // });
        }
        if (sort) {
            foundCars = this.customSort(sort, foundCars);
        }
        return foundCars;
    };

    public getById = async (id: number) => {
        return await this.carRepository.findOne({where: {id}, loadRelationIds: true});
    };
    public getByIdWithRelations = async (id: number) => {
        return await this.carRepository.findOne({
            where: {id},
            relations: ['model.configurations.engineType', 'model.configurations.driveType', 'brand', 'configuration.engineType', 'configuration.driveType', 'configuration.exteriorColors', 'configuration.interiorColors']
        });
    };

    public create = async (req: Request) => {
        const carData = req.body;
        // TODO несколько фоток
        carData.base64ImageSrc = req.body.base64ImageSrc
        const requestedBrand = carData
        const savedCar = await this.carRepository.save(carData);
        return await this.carRepository.findOneBy({id: savedCar.id})
    };

    public update = async (req: Request) => {
        const {id} = req.params;
        const carData = req.body;
        const updatedCar = await this.carRepository.update(Number(id), carData);
    };

    public delete = async (id: number) => {
        return await this.carRepository.delete(Number(id));
    };
}

const carService = new CarSerivce();
export default carService;