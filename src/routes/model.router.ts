import express, {NextFunction, Request, Response} from "express";
import modelService from "../service/model-service";
import carService from "../service/car-service";
import carsRouter from "./cars.router";

const modelRouter = express.Router()

modelRouter.get('/', async function (req, res, next) {
    try {
        const models = await modelService.getAll();
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
        res.setHeader('Content-Range', `cars 0-0/2`)

        res.status(200).json(models);
    } catch (error) {
        res.status(500).json({message: error.message});
        next(error);
    }
});

modelRouter.get('/:id', async function (req, res, next) {
    try {
        const {id} = req.params;
        const model = await modelService.getById(Number(id))
        if (!model) {
            res.status(404).json({message: 'Configuration not found'});
        }
        res.status(200).json(model);
    } catch (error) {
        res.status(500).json({message: error.message});
        next(error);
    }
})

modelRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newModel = await modelService.create(req)
        res.status(201).json(newModel);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message: error.message});
    }
})
modelRouter.put('/:id', async function (req, res, next) {
    try {
        const updateResult = await modelService.update(req)
        res.status(200).json(updateResult);
    } catch (error) {
        res.status(500).json({message: error.message});
        next(error);
    }
})
carsRouter.delete('/:id',async function (req, res, next) {
    const {id} = req.params;
    try {
        const deleted = await modelService.delete(Number(id));
        res.status(204).send('Car deleted successfully');
    }catch (error) {
        res.status(500).json({message: error.message});
        next(error);
    }
})
export default modelRouter;