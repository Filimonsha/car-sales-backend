import "reflect-metadata";
import { AppDataSource } from "./db/datasource.js";
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSTypeorm from '@adminjs/typeorm'
import express from 'express'
import { env } from "process";
import createError from'http-errors';
import path from'path';
import cookieParser from 'cookie-parser';
import logger from'morgan';
import carsRouter from "./routes/cars.js"
import { Car } from "./entities/car/Car.js";
import { Brand } from "./entities/car/Brand.js";


AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
})
const start = async () => {
  console.log("aa")
  const app = express();
  
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // app.use('/', indexRouter);
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

  const admin = new AdminJS({
    resources:[Car,Brand]
  });
  const adminRouter = AdminJSExpress.buildRouter(admin)
  console.log(admin)
  
  app.use(admin.options.rootPath, adminRouter)

  // await admin.watch()

  app.listen(3000)

}


start()
// module.exports = app;
