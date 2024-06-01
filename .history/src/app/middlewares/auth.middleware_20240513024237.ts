import { NextFunction, Request } from 'express'

const authValidation =  (...requriedRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
      try {
        // get authorization token ;
    } catch (error) {
      next(error)
    }
  }

export default authValidation
