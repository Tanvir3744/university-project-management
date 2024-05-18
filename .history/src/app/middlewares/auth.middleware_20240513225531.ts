import { NextFunction, Request } from 'express'
import ApiError from '../../errors/apiErrors'
import { UNAUTHORIZED } from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
const authValidation =
  (...requriedRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authorization token ;
      const token = req.headers.authorization

      // if the token returns an empty vlaue
      if (!token) {
        throw new ApiError(
          UNAUTHORIZED,
          'Sorry! Unauthorized user access detected'
        )
      }

      // verify token ;
      let verifiedToken = null

      verifiedToken = jwt.verify(token, config.jwt.secret as string)

        // push verifiedToken into user;
        console.log(req.user)
        req.user = verifiedToken as JwtPayload;
    } catch (error) {
      next(error)
    }
  }

export default authValidation
