import express, {NextFunction, Request, Response} from "express";
import {AppDataSource} from "../db/datasource";
import {EngineType} from "../entities/car/EngineType";

const engineTypeRouter = express.Router()
const engineTypeRepository = AppDataSource.getRepository(EngineType);

engineTypeRouter.get('/', async function (req, res, next) {
    try {
        const engineTypes = await engineTypeRepository.find();
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
        res.setHeader('Content-Range', `cars 0-0/2`)

        res.status(200).json(engineTypes);
    } catch (error) {
        res.status(500).json({message: error.message});
        next(error);
    }
});

engineTypeRouter.get('/:id', async function (req, res, next) {
    try {
        const {id} = req.params;
        const engineType = await engineTypeRepository.findOneBy({id:Number(id)})
        if (!engineType) {
            res.status(404).json({message: 'Configuration not found'});
        }
        res.status(200).json(engineType);
    } catch (error) {
        res.status(500).json({message: error.message});
        next(error);
    }
})

engineTypeRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedEngineType = await engineTypeRepository.save(req.body)
        console.log(savedEngineType)
        res.status(201).json(savedEngineType);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})
engineTypeRouter.put('/:id', async function (req, res, next) {
    try {
        const {id} = req.params;
        const updatedEngineType = await engineTypeRepository.update(Number(id),req.body)
        if (!updatedEngineType) {
            res.status(404).json({message: 'EngineType not found'});
        }
        res.status(200).json(updatedEngineType);
    } catch (error) {
        res.status(500).json({message: error.message});
        next(error);
    }
})
engineTypeRouter.delete('/:id',async function (req, res, next) {
    const {id} = req.params;
    try {
        const deleted = await engineTypeRepository.delete(Number(id));
        res.status(204).send('EngineType deleted successfully');
    }catch (error) {
        res.status(500).json({message: error.message});
        next(error);
    }

})
export default engineTypeRouter