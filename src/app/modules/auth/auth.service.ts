import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'
import { IUserLogin, IUserLoginResonse } from './auth.interface'
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

  // generate access token & refresh token
  const acessToken = JwtHelpers.generateToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = JwtHelpers.generateToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return {
    acessToken,
    refreshToken,
    needToChangePassword,
  }
}

export const AuthService = {
  loginUser,
}
