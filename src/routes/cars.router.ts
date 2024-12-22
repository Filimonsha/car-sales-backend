import express, {NextFunction, Request, Response} from 'express'
import carService from "../service/car-service.js";

const carsRouter = express.Router()


carsRouter.get('/', async function (req, res, next) {

    try {
        const cars = await carService.getAllCars();
        console.log(cars)
        res.setHeader('Access-Control-Expose-Headers','Content-Range')
        res.setHeader('Content-Range',`cars 0-0/2`)

        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({message: error.message});
        next(error);
    }
});

carsRouter.get('/:id', async function (req, res, next) {
    try {
        const {id} = req.params;
        const car = await carService.getCarById(Number(id))
        if (!car) {
            res.status(404).json({message: 'Car not found'});
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({message: error.message});
        next(error);
    }
})
carsRouter.post("/",async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newCar = await carService.create(req);
        res.status(201).json(newCar);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

carsRouter.put('/:id', async function (req, res, next) {
    try {
        const {id} = req.params;
        const updatedCar = await carService.update(req);
        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(500).json({message: error.message});
        next(error);
    }
})
carsRouter.delete('/:id',async function (req, res, next) {
        const {id} = req.params;
        try {
            const deleted = await carService.delete(Number(id));
            res.status(204).send('Car deleted successfully');
        }catch (error) {
            res.status(500).json({message: error.message});
            next(error);
        }
})
export default carsRouter;