import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'
import {
  IRefreshTokenResponse,
  IUserLogin,
  IUserLoginResonse,
} from './auth.interface'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import { JwtHelpers } from '../../../helpers/jwtHelper'

const loginUser = async (payload: IUserLogin): Promise<IUserLoginResonse> => {
  const { id, password } = payload

  // const user = new User()

  // check if the user is exists
  const isUserExists = await User.isUserExists(id)

  const { id: userId, role, needToChangePassword } = isUserExists

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists!')
  }

  if (
    isUserExists.password &&
    !(await User.isPasswordMatched(password, isUserExists?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect!')
  }

  // generate access token
  const accessToken = JwtHelpers.generateToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )
  // generate  refresh token
  const refreshToken = JwtHelpers.generateToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
    needToChangePassword,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null
  //verify refresh token
  try {
    verifiedToken = JwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as string
    )
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token')
  }

  // check if requested user is exists or not
  const { userId } = verifiedToken

  const isUserExists = await User.isUserExists(userId)

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists.')
  }

  // generate new access token
  const newAccessToken = JwtHelpers.generateToken(
    { id: isUserExists.id, role: isUserExists.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  return {
    accessToken: newAccessToken,
  }
}

export const AuthService = {
  loginUser,
  refreshToken,
}
