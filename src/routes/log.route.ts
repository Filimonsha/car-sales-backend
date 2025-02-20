import express from "express";
import {AppDataSource} from "../db/datasource";
import {Log} from "../entities/Log";

const logRouter = express.Router()
const logRepository = AppDataSource.getRepository(Log);

logRouter.get('/', async function (req, res, next) {
    try {
        const logs = await logRepository.find();
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
        res.setHeader('Content-Range', `cars 0-0/2`)

        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({message: error.message});
        next(error);
    }
});
logRouter.get('/:id', async function (req, res, next) {
    try {
        const {id} = req.params;
        const log = await logRepository.findOneBy({id:Number(id)})
        if (!log) {
            res.status(404).json({message: 'Log not found'});
        }
        res.status(200).json(log);
    } catch (error) {
        res.status(500).json({message: error.message});
        next(error);
    }
})
export default logRouter;