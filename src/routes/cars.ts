import express, {NextFunction, Request, Response} from 'express'
import carService from "../service/car-service.js";

const router = express.Router()


router.get('/', async function (req, res, next) {
    // const brandRepository = AppDataSource.getRepository(Brand)
    // const car = new Car()
    // car.carNumber = "112"
    // car.rating = 4
    // const brand = await brandRepository.findOneBy({id: 1})
    // car.brand = brand
    // AppDataSource.manager.save(car)
    // res.send('respond with a resource');
    try {
        const cars = await carService.getAllCars();
        console.log(cars)
        res.setHeader('Access-Control-Expose-Headers','Content-Range')
        res.setHeader('Content-Range',`cars 0-0/2`)

        res.status(200).json(cars);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const {id} = req.params;
        const car = await carService.getCarById(Number(id))
        if (!car) {
            res.status(404).json({message: 'Car not found'});
        }
        res.status(200).json(car);
    } catch (error) {
        next(error);
    }
})
router.post("/",async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newCar = await carService.createCar(req)
        console.log(newCar)
        res.status(201).json({data:newCar});
    } catch (error) {
        next(error);
    }
})
export default router;