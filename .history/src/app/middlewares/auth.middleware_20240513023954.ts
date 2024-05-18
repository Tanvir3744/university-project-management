import { NextFunction, Request } from 'express'

const authValidation =
    token => async (req: Request, res: Response, next: NextFunction) => {
      try {
        
      } catch (error) {
        next(error)
      }
  }

export default authValidation
