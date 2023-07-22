import express, { Application} from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import mainRouter from './app/routes'

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

//global error handler
app.use(globalErrorHandler)



export default app
