import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'
import { IUserLogin } from './auth.interface'

const loginUser = async (payload: IUserLogin) => {
  const { id, password } = payload

  const user = new User()

  // check if the user is exists
  const isUserExists = await user.isUserExists(id)

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists!')
  }

  if (
    isUserExists.password &&
    !user.isPasswordMatched(password, isUserExists?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect!')
  }

  // generate jwt token

  return {}
}

export const AuthService = {
  loginUser,
}
