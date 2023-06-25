import ApiError from '../../../errors/ApiError'
import { IStudent } from './student.interface'
import { Student } from './student.model'

const createStudent = async (payload: IStudent): Promise<IStudent | null> => {
  const result = await Student.create(payload)

  if (!result) {
    throw new ApiError(400, 'Failed to create student!')
  }
  return result
}

export const StudentService = {
  createStudent,
}
