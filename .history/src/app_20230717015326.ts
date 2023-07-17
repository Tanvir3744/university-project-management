import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/users/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()

// using middleware here
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// application routes
app.use('/api/v1/users', UserRoutes)


// testing api 
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log(x)
})

//global error handler
app.use(globalErrorHandler)



export default app
