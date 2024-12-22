import express, {NextFunction, Request, Response} from "express";
import {AppDataSource} from "../db/datasource";
import {Brand} from "../entities/car/Brand";

const brandRouter = express.Router()
const brandRepository = AppDataSource.getRepository(Brand);

brandRouter.get('/', async function (req, res, next) {
    try {
        const engineTypes = await brandRepository.find();
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
        res.setHeader('Content-Range', `cars 0-0/2`)

        res.status(200).json(engineTypes);
    } catch (error) {
        res.status(500).json({message: error.message});
        next(error);
    }
});

brandRouter.get('/:id', async function (req, res, next) {
    try {
        const {id} = req.params;
        const engineType = await brandRepository.findOneBy({id:Number(id)})
        if (!engineType) {
            res.status(404).json({message: 'Configuration not found'});
        }
        res.status(200).json(engineType);
    } catch (error) {
        res.status(500).json({message: error.message});
        next(error);
    }
})

brandRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedEngineType = await brandRepository.save(req.body)
        console.log(savedEngineType)
        res.status(201).json(savedEngineType);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})
brandRouter.put('/:id', async function (req, res, next) {
    try {
        const {id} = req.params;
        const updatedEngineType = await brandRepository.update(Number(id),req.body)
        if (!updatedEngineType) {
            res.status(404).json({message: 'EngineType not found'});
        }
        res.status(200).json(updatedEngineType);
    } catch (error) {
        res.status(500).json({message: error.message});
        next(error);
    }
})
brandRouter.delete('/:id',async function (req, res, next) {
    const {id} = req.params;
    try {
        const deleted = await brandRepository.delete(Number(id));
        res.status(204).send('EngineType deleted successfully');
    }catch (error) {
        res.status(500).json({message: error.message});
        next(error);
    }

})
export default brandRouter