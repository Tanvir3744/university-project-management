import { NextFunction, Request } from 'express'
import ApiError from '../../errors/apiErrors';
import { UNAUTHORIZED } from 'http-status';
import jwt from 'jsonwebtoken'
const authValidation =(...requriedRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get authorization token ;
        const token = req.headers.authorization;

        // if the token returns an empty vlaue
        if (!token) {
            throw new ApiError(UNAUTHORIZED, "Sorry! Unauthorized user access detected");
        }

        // verify token ;
        let verifiedToken = null;
        try {
            verifiedToken = jwt.
        } catch (error) {
            throw new ApiError(UNAUTHORIZED, 'invalid user access detected')
        }
    } catch (error) {
      next(error)
    }
  }

export default authValidation
