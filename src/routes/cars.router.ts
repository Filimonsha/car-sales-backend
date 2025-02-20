import express, {NextFunction, Request, Response} from 'express'
import carService from "../service/car-service.js";

const   carsRouter = express.Router()


carsRouter.get('/', async function (req, res, next) {
//TODO https://www.geeksforgeeks.org/how-to-implement-search-and-filtering-in-a-rest-api-with-node-js-and-express-js/ фильтрация

    try {
        let cars;
        if (req.query.loadFullInfo){
            cars = await carService.getAllCarsWithRelations(req)
        }else {
            // @ts-ignore
            cars = await carService.getAllCars(JSON.parse(req.query.sort),req.query.filter);
            res.setHeader('Access-Control-Expose-Headers','Content-Range')
            res.setHeader('Content-Range',`cars 0-0/2`)
        }
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({message: error.message});
        next(error);
    }
});

carsRouter.get('/:id', async function (req, res, next) {
    try {
        const {id} = req.params;
        let car;
        if (req.query.loadFullInfo){
            car = await carService.getByIdWithRelations(Number(id))
        }else {
            car = await carService.getById(Number(id))
        }
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