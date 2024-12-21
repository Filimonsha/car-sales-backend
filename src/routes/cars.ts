// import { AppDataSource } from "src/db/datasource.js";
// import { Car } from "src/entities/car/Car";
import express from 'express'
import { Car } from '../entities/car/Car.js';
import { AppDataSource } from '../db/datasource.js';
import { Brand } from '../entities/car/Brand.js';

const router = express.Router()


router.get('/', async function(req, res) {
  const brandRepository = AppDataSource.getRepository(Brand)
  const car = new Car()
  car.carNumber = "112"
  car.rating = 4
  const brand = await brandRepository.findOneBy({id:1})
  car.brand = brand
  AppDataSource.manager.save(car)
  res.send('respond with a resource');
});

router.get('/:id',async function(req,res) {

})
export default router;