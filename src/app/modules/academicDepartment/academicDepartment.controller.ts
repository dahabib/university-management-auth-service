import { Request, Response } from 'express'
import catchAsync from '../../shared/cachtAsynch'
import sendResponse from '../../shared/sendResponse'
import { IAcademicDepartment } from './academicDepartment.interface'
import httpStatus from 'http-status'
import { AcademicDepartmentService } from './academicDepartment.service'
import pick from '../../shared/pick'
import { academicDepartmentFilterableFields } from './academicDepartment.constant'
import { paginationFields } from '../../../constants/pagination'

// create department
const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body

  const result = await AcademicDepartmentService.createDepartment(
    academicDepartmentData
  )

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department created successfully!',
    data: result,
  })
})

// get all departments
const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicDepartmentService.getAllDepartments(
    filters,
    paginationOptions
  )

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Departments retrived successfully!',
    meta: result.meta,
    data: result.data,
  })
})

// get single department
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicDepartmentService.getSingleDepartment(id)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department retrived successfully!',
    data: result,
  })
})

// update department
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { ...updatedData } = req.body

  const result = await AcademicDepartmentService.updateDepartment(
    id,
    updatedData
  )

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department updated successfully!',
    data: result,
  })
})

// delete department
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicDepartmentService.deleteDepartment(id)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department deleted successfully!',
    data: result,
  })
})

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
}
