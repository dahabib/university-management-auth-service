import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../../shared/cachtAsynch'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { userFilterableFields } from './user.constant'
import { IUser } from './user.interface'

const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { student, ...studentData } = req.body
    const result = await UserService.createStudent(student, studentData)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully!',
      data: result,
    })
    next()
  }
)

// get all users
const getUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await UserSerice.getUsers(filters, paginationOptions)
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrived successfully!',
    meta: result.meta,
    data: result.data,
  })
})

// get single user
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await UserSerice.getSingleUser(id)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrived successfully!',
    data: result,
  })
})

// update user
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updatedData = req.body

  const result = await UserSerice.updateUser(id, updatedData)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully!',
    data: result,
  })
})

//delete user

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await UserSerice.deleteUser(id)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
    data: result,
  })
})

export const UserController = {
  createStudent,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
