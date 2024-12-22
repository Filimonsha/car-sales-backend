import {Repository} from "typeorm";
import {Car} from "../entities/car/Car";
import {Brand} from "../entities/car/Brand";
import {AppDataSource} from "../db/datasource";
import {Request} from "express";
import {Model} from "../entities/car/Model";

class ModelService {
    modelRepository:Repository<Model>

    constructor() {
        this.modelRepository = AppDataSource.getRepository(Model);
    }

    public getAll = async (skip?: number, take?: number) => {
        const queryBuilder = this.modelRepository.createQueryBuilder();
        queryBuilder
            .skip(skip)
            .take(take)
        const itemCount = await queryBuilder.getCount();
        const {entities} = await queryBuilder.getRawAndEntities();
        // TODO
        return await this.modelRepository.find();
    };

    public getById = async (id: number) => {
        return await this.modelRepository.findOneBy({id});
    };

    public create = async (req: Request) => {
        const carData = req.body;
        // TODO несколько фоток
        carData.base64ImageSrc = req.body.base64ImageSrc
        const requestedBrand = carData
        const savedCar = await this.modelRepository.save(carData);
        return await this.modelRepository.findOneBy({id: savedCar.id})
    };

    public update = async (req: Request) => {
        const {id} = req.params;
        const carData = req.body;
        return await this.modelRepository.update(Number(id), carData);
    };

    public delete = async (id: number) => {
        return await this.modelRepository.delete(Number(id));
    };
}

const carService = new ModelService();
export default carService;