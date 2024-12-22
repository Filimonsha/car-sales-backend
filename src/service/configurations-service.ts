import {Repository} from "typeorm";
import {Configuration} from "../entities/car/Configuration";
import {AppDataSource} from "../db/datasource";
import {Request} from "express";

class ConfigurationsService {
    configurationRepository: Repository<Configuration>

    constructor() {
        this.configurationRepository = AppDataSource.getRepository(Configuration)
    }

    public getAll = async (skip?: number, take?: number) => {
        const queryBuilder = this.configurationRepository.createQueryBuilder();
        queryBuilder
            .skip(skip)
            .take(take)
        const itemCount = await queryBuilder.getCount();
        const {entities} = await queryBuilder.getRawAndEntities();
        // TODO
        return await this.configurationRepository.find();
    };

    public getById = async (id: number) => {
        return await this.configurationRepository.findOneBy({id});
    };

    public create = async (req: Request) => {
        const savedConfig = await this.configurationRepository.save(req.body);
        return await this.configurationRepository.findOneBy({id:savedConfig.id})
    };

    public update = async (req: Request) => {
        let configuration = await this.configurationRepository.findOneBy({id:Number(req.params.id)});
        configuration = req.body
        const savedConfig = await this.configurationRepository.save(req.body);
        return await this.configurationRepository.findOneBy({id:savedConfig.id})
    };
}

const configurationService = new ConfigurationsService()
export default configurationService;