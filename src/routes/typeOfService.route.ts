import express, {NextFunction, Request, Response} from "express";
import {AppDataSource} from "../db/datasource";
import {TypeOfSerivce} from "../entities/TypeOfSerivce";

const typeOfServiceRouter = express.Router()
const typeOfServiceRepository = AppDataSource.getRepository(TypeOfSerivce);

typeOfServiceRouter.get('/', async function (req, res, next) {
    try {
        const service = await typeOfServiceRepository.find();
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
        res.setHeader('Content-Range', `cars 0-0/2`)

        res.status(200).json(service);
    } catch (error) {
        next(error);
    }
});

typeOfServiceRouter.get('/:id', async function (req, res, next) {
    try {
        const {id} = req.params;
        const service = await typeOfServiceRepository.findOneBy({id:Number(id)})
        if (!service) {
            res.status(404).json({message: 'Configuration not found'});
        }
        res.status(200).json(service);
    } catch (error) {
        next(error);
    }
})

typeOfServiceRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const service = await typeOfServiceRepository.save(req.body)
        console.log(service)
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})
typeOfServiceRouter.put('/:id', async function (req, res, next) {
    try {
        const {id} = req.params;
        const service = await typeOfServiceRepository.update(Number(id),req.body)
        if (!service) {
            res.status(404).json({message: 'Not found'});
        }
        res.status(200).json(service);
    } catch (error) {
        next(error);
    }
})
typeOfServiceRouter.delete('/:id',async function (req, res, next) {
    const {id} = req.params;
    try {
        const deleted = await typeOfServiceRepository.delete(Number(id));
        res.status(204).send('deleted successfully');
    }catch (error) {
        next(error);
    }

})
export default typeOfServiceRouter