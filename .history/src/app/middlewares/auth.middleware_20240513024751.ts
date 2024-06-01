import { NextFunction, Request } from 'express'

const authValidation =(...requriedRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get authorization token ;
        const token = req.headers.authorization;
    } catch (error) {
      next(error)
    }
  }

export default authValidation
