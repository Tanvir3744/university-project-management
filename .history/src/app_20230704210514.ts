import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
export const port: number = 3000

// using middleware here
app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
