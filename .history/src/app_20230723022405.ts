import express, { Application, Request, Response, NextFunction} from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import mainRouter from './app/routes'
import httpStatus from 'http-status'

const app: Application = express()

// using middleware here
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//application main routes
app.use("/api/v1", mainRouter);



// testing api 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// handle not found 
app.use((req:Request, res:Response, next:NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Ooops....!!! Not Found !",
    errorMessages: [{
      path: ".",
      message: "API not found !",
    }]
  }),
    next();
})

//global error handler
app.use(globalErrorHandler)



export default app
