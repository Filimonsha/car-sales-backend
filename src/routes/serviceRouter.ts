import express, {NextFunction, Request, Response} from "express";
import {AppDataSource} from "../db/datasource";
import {Service} from "../entities/Service";

const serviceRouter = express.Router()
const serviceRepository = AppDataSource.getRepository(Service);

serviceRouter.get('/', async function (req, res, next) {
    try {
        const service = await serviceRepository.find();
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
        res.setHeader('Content-Range', `cars 0-0/2`)

        res.status(200).json(service);
    } catch (error) {
        next(error);
    }
});

serviceRouter.get('/:id', async function (req, res, next) {
    try {
        const {id} = req.params;
        const service = await serviceRepository.findOneBy({id: Number(id)})
        if (!service) {
            res.status(404).json({message: 'Configuration not found'});
        }
        res.status(200).json(service);
    } catch (error) {
        next(error);
    }
})

serviceRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const serviceData = req.body;
        serviceData.photoOfService = req.body.photoOfService
        const savedService = await serviceRepository.save(serviceData)
        const service = await serviceRepository.findOneBy({id: savedService.id})
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({message: error.message});
        next(error);
    }
})
serviceRouter.put('/:id', async function (req, res, next) {
    try {
        const {updatedPhotoOfService,...entityParams} = req.body
        const {id} = req.params;
        let serviceData = entityParams;
        serviceData.photoOfService = updatedPhotoOfService
        await serviceRepository.update(Number(id), serviceData);

        const service = await serviceRepository.findOneBy({id:Number(id)})
        res.status(200).json(service);
    } catch (error) {
        next(error);
    }
})
serviceRouter.delete('/:id', async function (req, res, next) {
    const {id} = req.params;
    try {
        const deleted = await serviceRepository.delete(Number(id));
        res.status(204).send('deleted successfully');
    } catch (error) {
        next(error);
    }

})
export default serviceRouter