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
        return await this.configurationRepository.find({loadRelationIds: true});
    };

    public getById = async (id: number) => {
        // return await this.configurationRepository.findOneBy({id});
        return await this.configurationRepository.findOne({
            where: {id},
            loadRelationIds: true,
            relations: ['engineType', 'driveType', 'exteriorColors', 'interiorColors']
        });
    };

    public create = async (req: Request) => {
        const {cars, exteriorColors, interiorColors, ...putRequestBody} = req.body
        const requestBody: any = putRequestBody
        requestBody.exteriorColors = exteriorColors.map(color => ({id:color}))
        requestBody.interiorColors = interiorColors.map(color => ({id:color}))

        const savedConfig = await this.configurationRepository.save(requestBody);
        return await this.configurationRepository.findOneBy({id: savedConfig.id})
    };

    public update = async (req: Request) => {
        const {cars, exteriorColors, interiorColors, ...putRequestBody} = req.body
        const requestBody: any = putRequestBody
        requestBody.exteriorColors = exteriorColors.map(color => ({id:color}))
        requestBody.interiorColors = interiorColors.map(color => ({id:color}))

        const savedConfig = await this.configurationRepository.save(requestBody);
        return await this.configurationRepository.findOneBy({id: savedConfig.id})
    };
}

const configurationService = new ConfigurationsService()
export default configurationService;