import express, {NextFunction, Request, Response} from "express";
import {AppDataSource} from "../db/datasource";
import {DriveType} from "../entities/car/DriveType";

const driveTypeRouter = express.Router()
const driveTypeRepository = AppDataSource.getRepository(DriveType);

driveTypeRouter.get('/', async function (req, res, next) {
    try {
        const engineTypes = await driveTypeRepository.find();
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
        res.setHeader('Content-Range', `cars 0-0/2`)

        res.status(200).json(engineTypes);
    } catch (error) {
        next(error);
    }
});

driveTypeRouter.get('/:id', async function (req, res, next) {
    try {
        const {id} = req.params;
        const engineType = await driveTypeRepository.findOneBy({id: Number(id)})
        if (!engineType) {
            res.status(404).json({message: 'Configuration not found'});
        }
        res.status(200).json(engineType);
    } catch (error) {
        next(error);
    }
})

driveTypeRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedEngineType = await driveTypeRepository.save(req.body)
        console.log(savedEngineType)
        res.status(201).json(savedEngineType);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})
driveTypeRouter.put('/:id', async function (req, res, next) {
    try {
        const {id} = req.params;
        const updatedEngineType = await driveTypeRepository.update(Number(id), req.body)
        if (!updatedEngineType) {
            res.status(404).json({message: 'EngineType not found'});
        }
        res.status(200).json(updatedEngineType);
    } catch (error) {
        next(error);
    }
})
driveTypeRouter.delete('/:id', async function (req, res, next) {
    const {id} = req.params;
    try {
        const deleted = await driveTypeRepository.delete(Number(id));
        res.status(204).send('EngineType deleted successfully');
    } catch (error) {
        next(error);
    }

})
export default driveTypeRouter