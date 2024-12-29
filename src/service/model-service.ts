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
        return await this.modelRepository.find({relations:['configurations','cars']});
    };

    public getById = async (id: number) => {
        const model = await this.modelRepository.findOneBy({id});
        if (model.galleryImages) {
            // @ts-ignore
            model.galleryImages = model.galleryImages.map(image => ({src:image}))
        }
        return model;
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
        const {updatedBase64ImageSrc,...entityParams} = req.body
        const {id} = req.params;
        let carData = entityParams;
        carData.base64ImageSrc = updatedBase64ImageSrc
        await this.modelRepository.update(Number(id), carData);

        return await this.modelRepository.findOneBy({id:Number(id)})
    };

    public delete = async (id: number) => {
        return await this.modelRepository.delete(Number(id));
    };
}

const carService = new ModelService();
export default carService;