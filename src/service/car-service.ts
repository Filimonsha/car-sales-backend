import {NextFunction} from "express";
// import {AppDataSource} from "./src/db/datasource";
// import {Brand} from "src/entities/car/Brand";
// import {Car} from "src/entities/car/Car";
import {Repository} from "typeorm";
import type {Request, Response} from 'express'
import {Car} from "../entities/car/Car";
import {Brand} from "../entities/car/Brand";
import {AppDataSource} from "../db/datasource";
import cars from "../routes/cars";

class CarSerivce {
    carRepository: Repository<Car>;
    brandRepository: Repository<Brand>;

    constructor() {
        this.carRepository = AppDataSource.getRepository(Car);
        this.brandRepository = AppDataSource.getRepository(Brand)
    }

    public getAllCars = async (skip?: number, take?: number) => {
        const queryBuilder = this.carRepository.createQueryBuilder();
        queryBuilder
            .skip(skip)
            .take(take)
        const itemCount = await queryBuilder.getCount();
        const {entities} = await queryBuilder.getRawAndEntities();
        // TODO
        return await this.carRepository.find();
    };

    public getCarById = async (id: number) => {

        return await this.carRepository.findOneBy({id});

    };

    public createCar = async (req: Request) => {
        const carData = req.body;
        // TODO несколько фоток
        carData.base64ImageSrc = req.body.base64ImageSrc
        const requestedBrand = carData
        const savedCar = await this.carRepository.save(carData);
        return await this.carRepository.findOneBy({id:savedCar.id})
    };

    public updateCar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const carData = req.body;
            carData.base64ImageSrc = req.body.base64ImageSrc[0]

            const updatedCar = await this.carRepository.update(Number(id), carData);
            res.status(200).json(updatedCar.raw);
        } catch (error) {
            next(error);
        }
    };

    public deleteCar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            await this.carRepository.delete(Number(id));
            res.status(204).send('Car deleted successfully');
        } catch (error) {
            next(error);
        }
    };
}

const carService = new CarSerivce();
export default carService;