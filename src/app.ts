import "reflect-metadata";
import { AppDataSource } from "./db/datasource.js";
import express from 'express'
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import carsRouter from "./routes/cars.js"
import cors from "cors"
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
// console.log(path.join(__dirname, '../public'))
const start = async () => {
  const app = express();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors({
    exposeHeaders: 'Content-Range'
  }))
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

  // await admin.watch()

  app.listen(3000)

}


start()
// module.exports = app;
