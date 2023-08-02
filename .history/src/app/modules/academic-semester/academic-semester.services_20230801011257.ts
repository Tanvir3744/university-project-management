// business logic held in here
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/apiErrors'
import { pagintationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IpaginationOptionsTypes } from '../../../interfaces/pagination'
import { academicSemesterAndCodeMapper, searchAbleFields } from './academic-constants'
import {
  IAcademicFilter,
  IAcademicSemester,
} from './academic-semester.interface'
import { AcademicSemester } from './academic-semester.models'
import status from 'http-status'

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  // semester title and code matching validation
  if (academicSemesterAndCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(
      status.BAD_REQUEST,
      'Semester Title and code did not matched each other'
    )
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAllSemestersService = async (
  filters: IAcademicFilter,
  paginationOptions: IpaginationOptionsTypes
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  
  //logic and conditions for implement search functionality
  
  const { searchTerm , ...filtersData} = filters;
  
  const searchConditionWithAnd = [];

  if (searchTerm) {
    searchConditionWithAnd.push({
      $or: searchAbleFields.map((field) =>({
        [field]: {
          $regex: searchTerm, 
          $options: 'i'
        }
      }))
    })
  }


  // filter data using this funciton
  if (Object.keys(filtersData).length) {
    {
      searchConditionWithAnd.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value
        }))
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

  //if got any rejection without filtering and sorting api
  const whereCondition = searchConditionWithAnd.length > 0 ? { $and: searchConditionWithAnd } : {}

  const result = await AcademicSemester.find(whereCondition)
    .sort()
    .skip(skip)
    .limit(limit)
  
  const total = await AcademicSemester.countDocuments()
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
const getSingleSemesterService = async (id:string): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.findById(id);
  return result;
}


export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemestersService,
  getSingleSemesterService
}
