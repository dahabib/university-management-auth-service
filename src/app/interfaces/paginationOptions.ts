import { SortOrder } from 'mongoose'

export type IPaginationOptions = {
  page?: number
  limit?: number
  skip?: number
  sortBy?: string
  sortOrder?: SortOrder
}
