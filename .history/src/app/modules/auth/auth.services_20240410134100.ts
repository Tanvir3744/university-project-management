import { NOT_FOUND, UNAUTHORIZED } from 'http-status'
import ApiError from '../../../errors/apiErrors'
import { User } from '../users/user.model'
import { ILoginUser, ILoginUserResponse } from './auth.interface'
import config from '../../../config'
import { jwtHelpers } from '../../../helper/jwtHelpers'
import { Secret } from 'jsonwebtoken'

const loginUser = async (payload: ILoginUser):Promise<ILoginUserResponse> => {
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
    const {id: userId, role, needsPasswordChange } = isUserExist;

  // create jwt token (access token and refresh token );
    const accessToken = jwtHelpers.createToken(
        { id: userId, role: role },
        config.jwt.secret as Secret,
       {expiresIn:  config.jwt.expires_in as string }
    );
    
    const refreshToken = jwtHelpers.createToken(
        { id:userId, role: role },
        config.jwt.refresh_secret as Secret,
        {expiresIn: config.jwt.refresh_expires_in as string}
    );

    // check wehen these are coming or not
    console.log(accessToken, refreshToken, isUserExist.needsPasswordChange, 'this is accesstoken and refresh token console.log')

  return {
      accessToken, 
      refreshToken,
      needsPasswordChange
  }
}

export const AuthService = {
  loginUser,
}