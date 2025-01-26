import "reflect-metadata";
import {AppDataSource} from "./db/datasource.js";
import express from 'express'
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
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
// console.log(path.join(__dirname, '../public'))
const start = async () => {
    const app = express();

    app.use(logger('dev'));
    app.use(express.json({limit: '150mb'}));
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
