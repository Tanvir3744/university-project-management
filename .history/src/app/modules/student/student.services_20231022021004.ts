// business logic held in here
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/apiErrors'
import { pagintationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IStudent, IStudentFilter } from './student.interface'
import { Student } from './student.model'
import { studentSearchableFields } from './student.constants'

const getAllStudentService = async (
  filters:IStudentFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  //logic and conditions for implement search functionality

  const { searchTerm, ...filtersData } = filters

  const searchConditionWithAnd = []

  if (searchTerm) {
    searchConditionWithAnd.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  // filter data using this funciton
  if (Object.keys(filtersData).length) {
    {
      searchConditionWithAnd.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      })
    }
  }

  // declare type for pagination options
  const { page, limit, skip, sortBy, sortOrder } =
    pagintationHelpers.calculatePagination(paginationOptions)

  // sortconditions for dynamic sorting
  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  //if got any rejection without filtering and sorting api and this is holding all logics here
  const whereCondition =
    searchConditionWithAnd.length > 0 ? { $and: searchConditionWithAnd } : {}

  const result = await Student.find(whereCondition)
    .sort()
    .skip(skip)
    .limit(limit)

  const total = await Student.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

// get single semester service...
const getSingleStudentService = async (
  id: string
): Promise<IStudent | null> => {
  const result = await Student.findById(id)
  return result
}

//update data of academic-semester
const updateStudentService = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
 
  const result = await Student.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteStudentService = async (id: string) => {
  const result = await Student.findByIdAndDelete(id)
  return result
}

export const StudentService = {
  getAllStudentService,
  getSingleStudentService,
  updateStudentService,
  deleteStudentService,
}
