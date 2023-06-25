import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

export const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined
}

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string | undefined> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0')

  // increament by 1
  let increamentedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  increamentedId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${increamentedId}`

  return increamentedId
}

// export const findLastFacultyId = async () => {
//   const lastFaculty = await User.find({ role: 'faculty' }, { id: 1, _id: 0 })
//     .sort({ createdAt: -1 })
//     .lean()

//   return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined
// }

// export const generateFacultyId = async (): Promise<string | undefined> => {
//   const currentId =
//     (await findLastFacultyId()) || (0).toString().padStart(5, '0')

//   let increamentedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
//   increamentedId = `F-${increamentedId}`
//   return increamentedId
// }

// export const findLastAdminId = async () => {
//   const lastAdmin = await User.find({ role: 'admin' }, { id: 1, _id: 0 })
//     .sort({ createdAt: -1 })
//     .lean()

//   return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined
// }

// export const generateAdminId = async (): Promise<string | undefined> => {
//   const currentId = (await findLastAdminId()) || (0).toString().padStart(5, '0')
//   let increamentedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
//   increamentedId = `A-${increamentedId}`
//   return increamentedId
// }
