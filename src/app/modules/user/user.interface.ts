import { Model, Types } from 'mongoose'

export type IUserRole = 'student' | 'faculty' | 'admin'

export type IUser = {
  id: string | undefined
  role: IUserRole
  password: string
  student?: Types.ObjectId | IStudent
}

export type IStudent = {
  id: string
  role: IUserRole
  password: string
}

export type UserModel = Model<IUser, Record<string, unknown>>

export type IUserFilters = {
  searchTerm?: string
}
