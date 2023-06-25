import { IUserRole } from './user.interface'

export const userSearchableFields = ['id', 'role']

export const userFilterableFields = ['searchTerm', 'id', 'role']

export const userRoles: IUserRole[] = ['student', 'faculty', 'admin']
