import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()

// using middleware here
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// application routes
app.use('/api/v1/users', userRouter)


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

//global error handler
app.use(globalErrorHandler)

export default app
