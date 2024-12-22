import express, {NextFunction, Request, Response} from "express";
import {AppDataSource} from "../db/datasource";
import {Status} from "../entities/car/Status";

const statusRouter = express.Router()
const statusRepository = AppDataSource.getRepository(Status);

statusRouter.get('/', async function (req, res, next) {
    try {
        const engineTypes = await statusRepository.find();
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
        res.setHeader('Content-Range', `cars 0-0/2`)

        res.status(200).json(engineTypes);
    } catch (error) {
        next(error);
    }
});

statusRouter.get('/:id', async function (req, res, next) {
    try {
        const {id} = req.params;
        const engineType = await statusRepository.findOneBy({id:Number(id)})
        if (!engineType) {
            res.status(404).json({message: 'Configuration not found'});
        }
        res.status(200).json(engineType);
    } catch (error) {
        next(error);
    }
})

statusRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedEngineType = await statusRepository.save(req.body)
        console.log(savedEngineType)
        res.status(201).json(savedEngineType);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})
statusRouter.put('/:id', async function (req, res, next) {
    try {
        const {id} = req.params;
        const updatedEngineType = await statusRepository.update(Number(id),req.body)
        if (!updatedEngineType) {
            res.status(404).json({message: 'Not found'});
        }
        res.status(200).json(updatedEngineType);
    } catch (error) {
        next(error);
    }
})
statusRouter.delete('/:id',async function (req, res, next) {
    const {id} = req.params;
    try {
        const deleted = await statusRepository.delete(Number(id));
        res.status(204).send('deleted successfully');
    }catch (error) {
        next(error);
    }

})
export default statusRouter