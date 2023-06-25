import { z } from 'zod'
import { bloodGroups, gender } from '../student/student.constant'

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First name is required!' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'Last name is required!' }),
      }),
      gender: z.enum([...(gender as [string, ...string[]])], {
        required_error: 'Gender is required !',
      }),
      dateOfBirth: z.string({ required_error: 'Date of Birth is required !' }),
      email: z.string({ required_error: 'Email is required' }).email(),
      contactNo: z.string({ required_error: 'Contact Number is required !' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required !',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required !',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      bloodGroup: z
        .enum([...(bloodGroups as [string, ...string[]])])
        .optional(),
      guardian: z.object({
        fatherName: z.string({ required_error: 'Father name is required!' }),
        fatherOccupation: z.string({
          required_error: 'Father occupation is required!',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact number is required!',
        }),
        motherName: z.string({ required_error: 'Mother name is required!' }),
        motherOccupation: z.string({
          required_error: 'Mother occupation is required!',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact number is required!',
        }),
        address: z.string({ required_error: 'Guardian address is required !' }),
      }),
      localGuardian: z.object({
        name: z.string({ required_error: 'Local guardins name is required!' }),
        occupation: z.string({
          required_error: 'Local guardins occupation is required!',
        }),
        contactNo: z.string({
          required_error: 'Local guardins contact number is required!',
        }),
        address: z.string({
          required_error: 'Local guardian address is required !',
        }),
      }),
      academicSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      academicFaculty: z.string().optional(),
      profileImage: z.string().optional(),
    }),
  }),
})

const updateUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      }),
      gender: z.enum([...(gender as [string, ...string[]])]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      bloodGroup: z
        .enum([...(bloodGroups as [string, ...string[]])])
        .optional(),
      guardian: z.object({
        fatherName: z.string().optional(),
        fatherOccupation: z.string().optional(),
        fatherContactNo: z.string().optional(),
        motherName: z.string().optional(),
        motherOccupation: z.string().optional(),
        motherContactNo: z.string().optional(),
        address: z.string().optional(),
      }),
      localGuardian: z.object({
        name: z.string().optional(),
        occupation: z.string().optional(),
        contactNo: z.string().optional(),
        address: z.string().optional(),
      }),
      academicSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      academicFaculty: z.string().optional(),
      profileImage: z.string().optional(),
    }),
  }),
})

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
}
