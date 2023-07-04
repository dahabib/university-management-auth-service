/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export type IUserRole = 'student' | 'faculty' | 'admin'

export type IUser = {
  id: string | undefined
  role: IUserRole
  password: string
  needToChangePassword: true | false
  student?: Types.ObjectId | IStudent
}

export type IStudent = {
  id: string
  role: IUserRole
  password: string
}

export type IUserMethods = {
  isUserExists(id: string): Promise<Partial<IUser> | null>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>

export type IUserFilters = {
  searchTerm?: string
}
