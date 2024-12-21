import { NextFunction } from "express";
import { AppDataSource } from "src/db/datasource.js";
import { Brand } from "src/entities/car/Brand.js";
import { Car } from "src/entities/car/Car.js";
import { Repository } from "typeorm";

class CarSerivce {
    carRepository: Repository<Car>;
    brandRepository: Repository<Brand>;

    constructor() {
      this.carRepository = AppDataSource.getRepository(Car);
      this.brandRepository = AppDataSource.getRepository(Brand)
    }
  
    public getAllCars = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const cars = await this.carRepository.find();
        res.send(cars)
      } catch (error) {
        next(error);
      }
    };
  
    public getCarById = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const car = await this.carRepository.findById(Number(id));
        if (!car) {
          return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
      } catch (error) {
        next(error);
      }
    };
  
    public createCar = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const carData = req.body;
        const newCar = await this.carRepo.create(carData);
        res.status(201).json(newCar);
      } catch (error) {
        next(error);
      }
    };
  
    public updateCar = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const carData = req.body;
        const updatedCar = await this.carRepo.update(Number(id), carData);
        res.status(200).json(updatedCar.raw);
      } catch (error) {
        next(error);
      }
    };
  
    public deleteCar = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        await this.carRepository.delete(Number(id));
        res.status(204).send('Car deleted successfully');
      } catch (error) {
        next(error);
      }
    };
  }