import { Request, Response } from 'express'
import catchAsync from '../../shared/cachtAsynch'
import sendResponse from '../../shared/sendResponse'
import httpStatus from 'http-status'
import { AuthService } from './auth.service'
import { IUserLoginResonse } from './auth.interface'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await AuthService.loginUser(loginData)
  sendResponse<IUserLoginResonse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: result,
  })
})

export const AuthController = {
  loginUser,
}
