import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { AuthService } from './auth.services'
import config from '../../../config'

const loginController = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await AuthService.loginUser(loginData)
  const { refreshToken, ...others } = result

  // set refresh token before into cookie

  const cookieOption = {
    secure: config.env == 'Production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOption)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User has logged in successfully',
    data: others,
  })
})

// refresh token controller
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  // Extract the refresh token value from req.cookies
  const refreshTokenData = req.cookies.refreshToken;
  
  // Log the refresh token data to verify
  console.log(refreshTokenData, 'refresh token data');

  // Call AuthService.refreshToken with the refresh token value
  const result = await AuthService.refreshToken(refreshTokenData);

  // Set refresh token into cookie (if needed)
  // Make sure to use the correct variable for the token value
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshTokenData, cookieOptions)
  // Note: You may want to set the refreshed token back to the client, 
  // but make sure it's the refreshed token and not the function itself.
  // res.cookie('refreshToken', refreshedToken, cookieOptions);

  // Sending the response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  });
});

export const AuthLoginController = {
  loginController,
  refreshToken,
}
