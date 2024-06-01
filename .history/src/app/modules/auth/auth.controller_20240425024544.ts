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

export const AuthLoginController = {
  loginController,
  refreshToken
}
