import { NextFunction, Request, Response } from 'express'
import catchAsync from '../../shared/cachtAsynch'
import sendResponse from '../../shared/sendResponse'
import httpStatus from 'http-status'
import { StudentService } from './student.service'

const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...studentData } = req.body
    const result = await StudentService.createStudent(studentData)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully!',
      data: result,
    })
    next()
  }
)

export const StudentController = {
  createStudent,
}
