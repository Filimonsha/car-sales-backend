import configurationService from "../service/configurations-service";
import express, {NextFunction, Request, Response} from "express";
import carService from "../service/car-service";
import carsRouter from "./cars.router";

const configurationsRouter = express.Router()

configurationsRouter.get('/', async function (req, res, next) {
    try {
        const configurations = await configurationService.getAll();
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
        res.setHeader('Content-Range', `cars 0-0/2`)

        res.status(200).json(configurations);
    } catch (error) {
        next(error);
    }
});

configurationsRouter.get('/:id', async function (req, res, next) {
    try {
        const {id} = req.params;
        const configuration = await configurationService.getById(Number(id))
        if (!configuration) {
            res.status(404).json({message: 'Configuration not found'});
        }
        res.status(200).json(configuration);
    } catch (error) {
        next(error);
    }
})

configurationsRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newCar = await configurationService.create(req)
        console.log(newCar)
        res.status(201).json(newCar);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})
configurationsRouter.put('/:id', async function (req, res, next) {
    try {
        const configuration = await configurationService.update(req)
        if (!configuration) {
            res.status(404).json({message: 'Configuration not found'});
        }
        res.status(200).json(configuration);
    } catch (error) {
        next(error);
    }
})
carsRouter.delete('/:id',async function (req, res, next) {
    const {id} = req.params;
    try {
        const deleted = await carService.delete(Number(id));
        res.status(204).send('Car deleted successfully');
    }catch (error) {
        next(error);
    }
})
export default configurationsRouter;