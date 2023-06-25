import { Schema, Types, model } from 'mongoose'
import { IStudent, StudentModel } from './student.interface'
import { bloodGroups, gender } from './student.constant'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model'
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model'

export const studentSchema = new Schema<IStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    name: {
      firstName: { type: String, required: true },
      middleName: { type: String },
      lastName: { type: String, require: true },
    },
    gender: { type: String, required: true, enum: gender },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, requierd: true },
    bloodGroup: { type: String, enum: bloodGroups },
    guardian: {
      fatherName: { type: String, required: true },
      fatherOccupation: { type: String, required: true },
      fatherContactNo: { type: String, required: true },
      motherName: { type: String, required: true },
      motherOccupation: { type: String, required: true },
      motherContactNo: { type: String, required: true },
      address: { type: String, required: true },
    },
    localGuardian: {
      name: { type: String, required: true },
      occupation: { type: String, required: true },
      contactNo: { type: String, required: true },
      address: { type: String, required: true },
    },
    academicSemester: { type: Types.ObjectId, ref: AcademicSemester },
    academicDepartment: { type: Types.ObjectId, ref: AcademicDepartment },
    academicFaculty: { type: Types.ObjectId, ref: AcademicFaculty },
    profileImage: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Student = model<IStudent, StudentModel>('Student', studentSchema)
