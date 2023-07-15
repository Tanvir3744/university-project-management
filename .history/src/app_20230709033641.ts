import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

// using middleware here
app.use(cors())
app.use(express.urlencoded({ extended: true }))



// application routes
app.use('/api/v1/users')


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app