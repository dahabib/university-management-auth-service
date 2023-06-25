import { Model, Types } from 'mongoose'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

export type Gender = 'male' | 'female'

export type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
  address: string
}

export type LocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type UserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type IStudent = {
  id: string | undefined
  name: UserName
  gender: Gender
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  bloodGroup?: BloodGroup
  guardian: Guardian
  localGuardian: LocalGuardian
  academicSemester: Types.ObjectId | IAcademicSemester
  academicDepartment: Types.ObjectId | IAcademicDepartment
  academicFaculty: Types.ObjectId | IAcademicFaculty
  profileImage?: string
}

export type StudentModel = Model<IStudent, Record<string, unknown>>
