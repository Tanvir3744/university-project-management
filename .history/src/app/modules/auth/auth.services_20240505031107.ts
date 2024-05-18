import httpStatus, { NOT_FOUND, UNAUTHORIZED } from 'http-status'
import ApiError from '../../../errors/apiErrors'
import { User } from '../users/user.model'
import { ILoginUser, ILoginUserResponse } from './auth.interface'
import config from '../../../config'
import { jwtHelpers } from '../../../helper/jwtHelpers'
import { Secret } from 'jsonwebtoken'
import jwt from 'jsonwebtoken';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload

  const user = new User()
  const isUserExist = await user.isUserExist(id)

  if (!isUserExist) {
    throw new ApiError(NOT_FOUND, 'User does not exist')
  }

  // if the password does not matched to each other
  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new ApiError(UNAUTHORIZED, 'Password is incorrect')
  }

  // destructured data from isUserExist
  const { id: userId, role, needsPasswordChange } = isUserExist

  // create jwt token (access token and refresh token );
  const accessToken = jwtHelpers.createToken(
    { id: userId, role: role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    { id: userId, role: role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  
  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  }
}

const refreshToken = async (token: string) => {
  // verify token ;
  let verifyToken = null; 
  try {
    verifyToken = jwt.verify(token, config.jwt.refresh_secret as Secret);
    console.log(verifyToken)
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh Token");
  }
  /* console.log(verifyToken, token, 'this is for verify token')

  // if user has been deleted but his token is still exist in cookies
  const user = new User();
  const isUserExist = await user.isUserExist() */
}

export const AuthService = {
  loginUser,
  refreshToken
}
