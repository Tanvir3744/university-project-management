import express, { Request, Response } from 'express'

export const app = express()
export const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
