import express, { Application} from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/users/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { academicSemesterRoutes } from './app/modules/academic-semester/academic-semester.route'

const app: Application = express()

// using middleware here
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// application routes
app.use('/api/v1/users', UserRoutes)


// testing api 
/* app.get('/', async(req: Request, res: Response, next: NextFunction) => {
  await Promise.reject( new Error("new erros arrives"));
}) */

//global error handler
app.use(globalErrorHandler)


//actual routes 
app.use("/api/v1/academic-semesters", AcademicSemesterRoutes);

export default app
