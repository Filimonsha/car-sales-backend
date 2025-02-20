import "reflect-metadata";
import {AppDataSource} from "./db/datasource.js";
import express, {NextFunction, Request, Response} from 'express'
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import carsRouter from "./routes/cars.router"
import cors from "cors"
import configurationsRouter from "./routes/configuration.router";
import modelRouter from "./routes/model.router";
import engineTypeRouter from "./routes/engineType.router";
import driveTypeRouter from "./routes/driveType.router";
import statusRouter from "./routes/status.router";
import brandsRoute from "./routes/brands.route";
import colorRouter from "./routes/colors.router";
import {Log} from "./entities/Log";
import logRouter from "./routes/log.route";
import bodyParser from "body-parser";
import typeOfServiceRouter from "./routes/typeOfService.route";
import serviceRouter from "./routes/serviceRouter";

const entityChangedLogger = async (req: Request, res: Response, next: NextFunction) => {
    const logRepository = AppDataSource.getRepository(Log);

    // Логируем информацию о запросе
    const log = new Log();
    log.level = 'info';

    if (req.method !== "GET" && req.method !== "OPTIONS") {
        log.message = `${req.method} ${req.url}`;
        log.context = JSON.stringify({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        try {
            const savedLog = await logRepository.save(log);
            console.log(savedLog)
        } catch (error) {
            console.error('Ошибка при записи лога:', error);
        }
    }

    next();
};
const start = async () => {
    const app = express();
    app.use(bodyParser.json({limit:"300mb"}))
    app.use(entityChangedLogger)
    app.use(logger('dev'));
    app.use(express.json({limit: '90mb'}));
    app.use(bodyParser.urlencoded({ extended: true, limit: '90mb' }));
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(cors({
        exposeHeaders: 'Content-Range'
    }))
    // app.use('/', indexRouter);
    app.use('/engine-types', engineTypeRouter)
    app.use('/drive-types', driveTypeRouter)
    app.use('/statuses', statusRouter)
    app.use('/colors', colorRouter)
    app.use('/configuration', configurationsRouter)
    app.use('/models', modelRouter)
    app.use('/brands', brandsRoute)
    app.use('/cars', carsRouter);
    app.use('/logs', logRouter)
    app.use('/typeofservices',typeOfServiceRouter)
    app.use('/services',serviceRouter)
    // catch 404 and forward to error handler
    // app.use(function(req, res, next) {
    //   next(createError(404));
    // });

    // // error handler
    // app.use(function(err, req, res, next) {
    //   // set locals, only providing error in development
    //   res.locals.message = err.message;
    //   res.locals.error = req.app.get('env') === 'development' ? err : {};

    //   console.log(err.message)
    //   // render the error page
    //   res.status(err.status || 500);
    // });


    await AppDataSource.initialize()

    // await admin.watch()

    app.listen(3000)

}


start()
// module.exports = app;
