import { Request, Response } from 'express'
import catchAsync from '../../shared/cachtAsynch'
import sendResponse from '../../shared/sendResponse'
import httpStatus from 'http-status'
import { AuthService } from './auth.service'
import { IRefreshTokenResponse, IUserLoginResonse } from './auth.interface'
import config from '../../../config'

// login controller
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await AuthService.loginUser(loginData)
  const { refreshToken, ...others } = result

  // set refreshToken into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  // delete refresh token after setting into cookie
  if ('refreshToken' in result) {
    delete result.refreshToken
  }

  sendResponse<IUserLoginResonse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: others,
  })
})

// refresh token controller
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const result = await AuthService.refreshToken(refreshToken)

  // set refreshToken into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  // delete refresh token after setting into cookie
  if ('refreshToken' in result) {
    delete result.refreshToken
  }

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: result,
  })
})

export const AuthController = {
  loginUser,
  refreshToken,
}
